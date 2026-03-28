interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: "left" | "center"
}

export default function SectionTitle({ title, subtitle, align = "left" }: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start"

  return (
    <div className={`flex flex-col gap-2 ${alignClass}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-text">{title}</h2>
      {subtitle && <p className="text-muted text-base md:text-lg max-w-2xl">{subtitle}</p>}
      <div className={`h-1 w-12 bg-primary rounded-full mt-1 ${align === "center" ? "self-center" : ""}`} />
    </div>
  )
}
