import { useNavigate } from 'react-router-dom'
import { ArrowLeftRight, LifeBuoy, Unlock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/common/Logo'
import {
  MascotHandoffDuo,
  MascotHandoff,
  MascotSearch,
  MascotExchange,
} from '@/components/common/illustrations'
import { Reveal } from '@/components/common/Reveal'
import { MiniCardMock } from '@/components/common/MiniCardMock'
import { useAppState } from '@/hooks/useAppState'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { cn, staggerDelay } from '@/lib/utils'

const PARTIES = [
  {
    illustration: MascotHandoff,
    title: '人才方',
    description: '除去偏見資訊，讓專業技能與價值觀成為你的出場名片。',
    cta: { label: '建立名片', to: '/build' },
    mock: {
      title: '資深後端工程師',
      subtitle: '高階（具備決策能力與影響力）',
      fields: [
        { label: '最關注的領域/產業', value: '軟體業' },
        { label: '擅長使用的語言', value: '中文、英文' },
      ],
      tags: ['Figma', '遠端'],
    },
  },
  {
    illustration: MascotSearch,
    title: '求才方',
    description: '不只媒合，更協助你呈現吸引合適人選的企業文化。',
    cta: { label: '探索人才', to: '/explore' },
    mock: {
      title: 'XXX職位',
      subtitle: '000公司',
      fields: [
        { label: '最關注的領域/產業', value: '軟體業' },
        { label: '擅長使用的語言', value: '中文、英文' },
      ],
      tags: ['Figma', '遠端'],
    },
  },
  {
    illustration: MascotExchange,
    title: '雙方',
    description: '尊重的溝通環境，只留下可學習的回饋，讓對話值得繼續。',
    cta: null,
    mock: null,
  },
]

const FEATURES = [
  {
    icon: ArrowLeftRight,
    title: '反向媒合',
    description: '由求才方主動邀請，並說明「為什麼是你」，開啟更平等的對話。',
  },
  {
    icon: Unlock,
    title: '漸進式揭露',
    description: '從匿名對話到完整個資，像交朋友般逐步建立信任。',
  },
  {
    icon: LifeBuoy,
    title: '第三方專業支持',
    description: '不會讓你孤單。專業顧問陪跑，補足企業與個人探索的不足。',
  },
]

const TALENT_BENEFITS = [
  '不用為了誰調整人生經歷',
  '由你自己決定跟誰開啟對話與何時揭露個人資訊',
  '把每一次的選擇累積成屬於你的職涯資產',
  '幫助別人，也讓別人幫助你',
]

const EMPLOYER_REASONS = ['對方沒有回覆的真正原因', '談得不錯，卻沒有結果的真正原因', '入職後卻留不久的真正原因']

const EMPLOYER_GAINS = ['更低的錯配率與試錯成本', '找到價值觀相符、願意投入的人', '更清楚的市場回饋，而非已讀不回']

function SectionHeading({ children, className }) {
  return <h2 className={cn('text-2xl font-bold md:text-3xl', className)}>{children}</h2>
}

export default function HomePage() {
  const { isLoggedIn, user } = useAppState()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const openAuthDialog = () => dispatch({ type: 'OPEN_AUTH_DIALOG' })

  return (
    <div className="h-full overflow-y-auto">
      {/* 1. Hero */}
      <section className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-10 px-6 py-14 md:flex-row md:py-24">
        <div className="flex-1 text-center md:text-left">
          {isLoggedIn && (
            <div
              className="mb-3 animate-in fade-in slide-in-from-bottom-1 text-sm text-primary duration-700"
              style={staggerDelay(0, 80)}
            >
              歡迎回來，{user?.name ?? '使用者'}
            </div>
          )}
          <h1
            className="animate-in fade-in slide-in-from-bottom-2 text-3xl leading-tight font-bold duration-700 md:text-4xl"
            style={staggerDelay(1, 80)}
          >
            找一份雙向奔赴的工作，
            <br />
            遇見理念相同的夥伴。
          </h1>
          <p
            className="animate-in fade-in slide-in-from-bottom-2 mt-4 text-[15px] leading-relaxed text-muted-foreground duration-700"
            style={staggerDelay(2, 80)}
          >
            遞出名片、建立信任，讓人才展現價值，讓企業收穫成長。
          </p>
          <div
            className="animate-in fade-in slide-in-from-bottom-2 mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start duration-700"
            style={staggerDelay(3, 80)}
          >
            <Button size="lg" variant="outline" onClick={() => navigate('/build')}>
              展現自我價值
            </Button>
            <Button size="lg" onClick={() => navigate('/explore')}>
              尋找理想夥伴
            </Button>
          </div>
          {!isLoggedIn && (
            <Button
              variant="ghost"
              className="mt-2 text-muted-foreground"
              onClick={openAuthDialog}
            >
              登入解鎖邀請、聊天等功能
            </Button>
          )}
        </div>
        <div
          className="animate-in fade-in zoom-in-95 shrink-0 duration-700"
          style={staggerDelay(1, 80)}
        >
          <MascotHandoffDuo size={240} />
        </div>
      </section>

      {/* 2. 介紹 */}
      <Reveal as="section" className="mx-auto max-w-2xl px-6 py-14 text-center md:py-16">
        <SectionHeading>每一次連結，都從「為什麼是你」開始</SectionHeading>
        <p className="mt-4 text-[15px] leading-loose text-muted-foreground">
          不是盲投履歷，也不是被動等待，
          <br />
          而是透過名片交換漸進式揭露，
          <br />
          讓對話只發生在真正有意願的雙方之間。
        </p>
      </Reveal>

      {/* 3. 三方卡片 */}
      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex flex-col gap-14 md:gap-10">
          {PARTIES.map((party, i) => {
            const Illustration = party.illustration
            // 插畫與名片 mock 左右交錯：人才方插畫在右／mock 在左，求才方相反，
            // 對應參考稿 Desktop - 1.png 兩張三方卡片的鏡射版面
            const illustrationOnRight = i % 2 === 0
            return (
              <Reveal key={party.title} delay={i * 100}>
                <div className="relative">
                  {party.mock && (
                    <div
                      className={cn(
                        'absolute -top-8 z-10 hidden -rotate-6 md:block',
                        illustrationOnRight ? '-left-6' : '-right-6'
                      )}
                    >
                      <MiniCardMock {...party.mock} />
                    </div>
                  )}
                  <div
                    className={cn(
                      'flex flex-col items-center gap-6 border border-border bg-secondary/70 p-8 text-center md:p-10 md:text-left',
                      '[clip-path:polygon(0_3%,100%_0%,100%_97%,0_100%)]',
                      illustrationOnRight ? 'md:flex-row-reverse' : 'md:flex-row'
                    )}
                  >
                    <Illustration className="shrink-0" size={party.title === '雙方' ? 200 : 150} />
                    <div>
                      <h3 className="text-xl font-bold">{party.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{party.description}</p>
                      {party.cta && (
                        <Button className="mt-4" onClick={() => navigate(party.cta.to)}>
                          {party.cta.label}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* 4. 語錄 */}
      <Reveal as="section" className="mx-auto max-w-2xl px-6 py-14 text-center md:py-16">
        <blockquote className="text-[15px] leading-loose text-muted-foreground italic">
          "As you yourself are a component part of a social system,
          <br />
          so let every act of yours be a component part of social life."
        </blockquote>
        <p className="mt-3 text-sm text-muted-foreground">— Marcus Aurelius</p>
        <p className="mt-5 text-sm leading-relaxed text-foreground">
          正如你是社會體系中的一部分，你的每一個行為也都會是社會組成的一部分。
          <br />— 馬可．奧勒留
        </p>
      </Reveal>

      {/* 5. 人才方好處 */}
      <Reveal as="section" className="mx-auto max-w-4xl px-6 py-14 md:py-16">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <MascotHandoff size={170} className="shrink-0" />
          <div className="text-center md:text-left">
            <SectionHeading>不用再把自己寫成「別人想要的樣子」</SectionHeading>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {TALENT_BENEFITS.map((item) => (
                <li key={item} className="flex items-start justify-center gap-2 md:justify-start">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      {/* 6. 求才方好處 */}
      <Reveal as="section" className="mx-auto max-w-4xl px-6 py-14 md:py-16">
        <div className="flex flex-col-reverse items-center gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <SectionHeading>不見得是條件不夠好，而是你不知道：</SectionHeading>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {EMPLOYER_REASONS.map((item) => (
                <li key={item} className="flex items-start justify-center gap-2 md:justify-start">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-medium">你將獲得的不是更多履歷，而是：</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {EMPLOYER_GAINS.map((item) => (
                <li key={item} className="flex items-start justify-center gap-2 md:justify-start">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <MascotSearch size={170} className="shrink-0" />
        </div>
      </Reveal>

      {/* 7. 三特色卡 */}
      <Reveal as="section" className="mx-auto max-w-4xl px-6 py-14 md:py-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-secondary/70 p-6">
              <f.icon className="size-5 text-primary" strokeWidth={1.5} />
              <h3 className="mt-3 text-sm font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* 8. 結尾 */}
      <Reveal as="section" className="mx-auto max-w-2xl px-6 py-14 text-center md:py-16">
        <SectionHeading>
          我們深信，成功的合作過程
          <br />
          不應是單向的篩選，而是長期的同行。
        </SectionHeading>
        <p className="mt-4 text-[15px] leading-loose text-muted-foreground">
          在這裡，每一次互動都不是浪費時間，而是更理解彼此的過程。
          <br />
          讓經驗被看見，讓文化得以被選擇，讓人與企業，真正走在同一條路上。
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" variant="outline" onClick={() => navigate('/build')}>
            展現自我價值
          </Button>
          <Button size="lg" onClick={() => navigate('/explore')}>
            尋找理想夥伴
          </Button>
        </div>
      </Reveal>

      {/* 9. Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <h4 className="text-sm font-bold">簡介</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              CoTrace 是一個以「遞名片」為起點、保護個資、由人才主導價值的媒合平台，讓求才方主動找到你，用名片交換建立真實連結。
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold">聯絡資訊</h4>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Threads
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-6 pb-10">
          <Logo size={22} />
        </div>
      </footer>
    </div>
  )
}
