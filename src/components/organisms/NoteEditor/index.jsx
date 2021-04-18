import { useEffect, useRef } from 'react'
import isEqual from 'fast-deep-equal'

import BlockEditable from 'components/molecules/BlockEditable'
import HelpMarkdown from 'components/molecules/HelpMarkdown'
import Block from 'components/molecules/Block'
import LoadingOverlay from 'components/atoms/LoadingOverlay'

import {
  Container, EditorContainer,
  Editor, NoteTitle, Content,
} from './styles'

function NoteEditor({ isEditable, ...props }) {
  const blocksRef = useRef({})

  const { blocks, params, lastAction, blocksDispatch } = props
  const { content: article, resource: note } = props.resource

  useEffect(() => {
    if (lastAction) {
      onReducerChange(lastAction)
    }
  }, [lastAction, params])

  return (
    <Container {...props}>
      <EditorContainer>
        <Editor editable={isEditable}>
          <div className={isEditable ? 'mb-8' : 'mb-16'}>
            <NoteTitle
              level="h1"
              contentEditable={isEditable}
              suppressContentEditableWarning
              onBlur={onNoteTitleBlur}
              editable={isEditable}
            >
              {article.title}
            </NoteTitle>
            {note.source_id && (
              <div
                className="text-gray-300 pt-4 cursor-pointer hover:underline font-normal text-base"
                onClick={openArticle}
              >
                Open original resource
              </div>
            )}
          </div>
          <Content>
            {renderBlocks()}
          </Content>
        </Editor>
      </EditorContainer>
      <HelpMarkdown />
    </Container>
  )

  function openArticle() {
    props.openResource(note.source_id)
  }

  function focusPrevBlock(block) {
    const { position } = block

    if (position === 0) {
      return
    }

    const prevBlock = blocks.find(b => b.position === position - 1)

    setTimeout(() => blocksRef.current[prevBlock.id].focus())
  }

  function focusNextBlock(block) {
    const { position } = block

    if (position === blocks.length - 1) {
      return
    }

    const nextBlock = blocks.find(b => b.position === position + 1)

    setTimeout(() => blocksRef.current[nextBlock.id].focus())
  }

  function getPreviousBlock(block) {
    const { position } = block

    return blocks.find(b => b.position === position - 1)
  }

  function onNoteTitleBlur(evt) {
    let title = evt.target.innerText

    if (title === '') {
      title = 'Untitled'
    }

    if (typeof props.updateArticle === 'function') {
      props.updateArticle(article.id, { title })
    }
  }

  function renderBlocks() {
    let order = null

    if (props.loadingBlocks) {
      return (
        <LoadingOverlay />
      )
    }

    return blocks.map((blk) => {
      if (blk.list === 'o') {
        order = order === null ? 1 : order + 1
      } else {
        order = null
      }
      const block = { ...blk, order }

      if (isEditable) {
        return (
          <BlockEditable
            key={`BlockEditable_${blk.id}`}
            ref={el => blocksRef.current[blk.id] = el}
            block={block}
            dispatch={blocksDispatch}
            url={props.baseUrl}
            getPreviousBlock={getPreviousBlock}
            focusPrevBlock={focusPrevBlock}
            focusNextBlock={focusNextBlock}
          />
        )
      } else {
        return (
          <Block
            key={`BlockNoteRead_${blk.id}`}
            block={block}
            url={props.baseUrl}
            noAdd
            openResource={props.openResource}
          />
        )
      }
    })
  }

  function onReducerChange(action) {
    const { type, payload } = action

    console.log('ACTION', type)

    switch (type) {
      case 'APPEND': {
        const { block, newBlock } = params
        props.createBlock(block)
        props.createBlock(newBlock)
        break
      }
      case 'ADD_NEW': {
        const { block } = params
        props.createBlock(block)
        break
      }
      case 'UPDATE': {
        const { block } = params
        props.updateBlock(block)
        break
      }
      case 'UPDATE_ADD': {
        const { updated, newBlock } = params
        props.updateBlock(updated)
        props.createBlock(newBlock)

        // Focus on next block
        const { position } = updated
        const { id } = blocks[position + 1]

        blocksRef.current[id].focus()
        break
      }
      case 'DELETE': {
        const { block } = params
        props.deleteBlock(block)

        // Focus on previous block
        const { position } = payload
        if (position - 1 < 0) return
        const { id } = blocks[position - 1]

        blocksRef.current[id].focus()
        break
      }
      case 'DELETE_UPDATE': {
        const { block, prevBlock } = params
        props.deleteBlock(block)
        props.updateBlock(prevBlock)

        blocksRef.current[prevBlock.id].focus()
        break
      }
    }
  }
}

export default NoteEditor
