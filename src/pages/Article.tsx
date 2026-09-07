import { Link, useParams } from 'react-router-dom'
import { NEWS } from '../data/content'
import { CtaBlock, ImgReveal, Reveal, Tag } from '../components/ui'

export default function Article() {
  const { slug } = useParams()
  const article = NEWS.find((n) => n.slug === slug) || NEWS[0]
  const related = NEWS.filter((n) => n.slug !== article.slug).slice(0, 2)

  return (
    <main>
      <header className="pt-[150px] md:pt-[190px]">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <Reveal>
            <Tag label={`News — ${article.category}`} />
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display font-extrabold leading-[1.04] tracking-[-0.02em] mt-10 text-[32px] md:text-[52px] lg:text-[62px] max-w-[1000px]">
              {article.title}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="label text-[#6e746f] mt-8">{article.date}</p>
          </Reveal>
        </div>
        {article.image && (
          <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto mt-14">
            <ImgReveal src={article.image} alt="" className="aspect-[16/9] md:aspect-[21/9]" imgClassName="page-hero-img" />
          </div>
        )}
      </header>

      <section className="py-20 md:py-28">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <div className="max-w-[760px]">
            {article.body.map((p, i) => (
              <Reveal key={i} delay={i * 60}>
                <p className={`leading-[1.9] text-[#3b403c] ${i === 0 ? 'text-[19px] md:text-[21px] font-medium' : 'text-[16px] md:text-[17px] mt-8'}`}>
                  {p}
                </p>
              </Reveal>
            ))}
            <Reveal>
              <div className="mt-14 pt-8 border-t border-[#dcd8cd]">
                <Link to="/news" className="tlink">
                  Back to news
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#ece9e1]">
        <div className="px-6 md:px-14 lg:px-20 max-w-[1560px] mx-auto">
          <Reveal>
            <Tag label="Related articles" />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
            {related.map((n, i) => (
              <Reveal key={n.slug} delay={i * 80}>
                <Link to={`/news/${n.slug}`} className="group block border-t border-[#1c1f1d] pt-7">
                  <p className="label text-[#6e746f]">
                    {n.date} — {n.category}
                  </p>
                  <h3 className="font-display font-bold leading-[1.2] mt-4 text-[20px] md:text-[24px] group-hover:text-[#1d6151] transition-colors">
                    {n.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock />
    </main>
  )
}
