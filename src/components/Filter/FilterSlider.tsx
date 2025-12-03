import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

interface FilterSliderProps {
	priceRange: { min: number; max: number }
	sliderValues: number[]
	handleSliderChange: (values: number | number[]) => void
}

const FilterSlider = ({
	priceRange,
	sliderValues,
	handleSliderChange,
}: FilterSliderProps) => {
	return (
		<div className='w-[200px] px-2 mx-auto'>
			<Slider
				range
				min={priceRange.min}
				max={priceRange.max}
				value={sliderValues}
				onChange={handleSliderChange}
				styles={{
					track: { backgroundColor: '#000' },

					handle: {
						backgroundColor: '#000',

						opacity: '100%',

						borderRadius: '35%',

						border: '4px solid #fff',

						width: 20,

						height: 20,

						cursor: 'pointer',

						marginTop: -8,

						boxShadow: 'none',
					},

					rail: { backgroundColor: '#000', opacity: '25%' },
				}}
			/>
		</div>
	)
}
export default FilterSlider
