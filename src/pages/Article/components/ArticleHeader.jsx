import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'
import { BiShareAlt, BiSolidTime } from 'react-icons/bi'
import Breadcrumbs from '@/components/ui/Breadcrums'
import './ArticleHeader.css'

const ArticleHeader = ({ title, date }) => {
  const breadcrumbsData = [{ name: 'Inicio', url: '/' }, { name: 'Blog', url: '/blog' }, { name: 'Artículo del blog' }]
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    // Copy the current page's URL to the clipboard
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)

    // Reset the "enlace copiado" message after a few seconds
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <header className="article-card__header bg-info-subtle text-dark pb-4">
      <Container>
        <div className="breadcrumb mx-3">
          <Breadcrumbs breadcrumbs={breadcrumbsData} />
        </div>
        <h2 className="text-center mb-5">{title}</h2>
        <div className="d-flex align-items-center gap-2 mx-3 fw-bold">
          <BiSolidTime /> {new Date(date).toLocaleDateString('es-CL', {
            dateStyle: 'long'
          })}
        </div>
        <div className="d-flex align-items-center gap-2 mx-3">
          <BiShareAlt className="mt-1" role="button" onClick={copyToClipboard} />
          {copied && <span className="enlace-copiado">Enlace copiado</span>}
          <a className="text-black" href="https://www.instagram.com/ongsurgencia/reels/" target="_blank">
            <BsInstagram />
          </a>
          <a
            className="text-black"
            href="https://web.facebook.com/ongsurgencia/?locale=es_LA&_rdc=1&_rdr"
            target="_blank"
          >
            <BsFacebook />
          </a>
          <a className="text-black" href="https://twitter.com/ongsurgencia?lang=es" target="_blank">
            <BsTwitter />
          </a>
          <a className="text-black" href="https://www.linkedin.com/company/surgencia-ong/about/" target="_blank">
            <BsLinkedin />
          </a>
        </div>
      </Container>
    </header>
  )
}

export default ArticleHeader
