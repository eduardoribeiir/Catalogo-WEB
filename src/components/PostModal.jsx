import React from 'react'

export default function PostModal({ post, onClose }) {
  if (!post) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <button className="btn" onClick={onClose}>Fechar</button>
      </div>
    </div>
  )
}
