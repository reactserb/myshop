const HighlightText = ({
	text,
	highlight,
}: {
	text: string
	highlight: string
}) => {
	const highlightTokens = highlight
		.trim()
		.split(/\s+/)
		.filter(token => token.length > 0)

	if (highlightTokens.length === 0) return <>{text}</>

	const regex = new RegExp(`(${highlightTokens.join('|')})`, 'gi')

	const parts = text.split(regex)

	return (
		<span>
			{parts.map((part, i) => {
				const isHighlight = highlightTokens.some(
					token => part.toLowerCase() === token.toLowerCase()
				)

				return isHighlight ? (
					<span key={i} className='font-bold'>
						{part}
					</span>
				) : (
					part
				)
			})}
		</span>
	)
}

export default HighlightText
