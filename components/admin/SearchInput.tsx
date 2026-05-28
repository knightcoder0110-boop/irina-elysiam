export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search name, phone, email…',
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <input
      className="form-input bg-neutral-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}
