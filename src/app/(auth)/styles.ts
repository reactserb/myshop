export const buttonStyles = {
	base: 'w-65 py-4 my-10 mx-auto text-xl rounded cursor-pointer transition-all duration-200',
	active: 'bg-gray-600 text-white',
	inactive: 'bg-gray-200 text-black',
}

export const formStyles = {
	label: 'text-base text-gray-500 block',
	input:
		'w-65 h-10 px-4 text-black text-base border border-gray-300 rounded focus:border-gray-500 focus:bg-white focus:outline-none transition-shadow duration-150',
	loginLink:
		'mb-10 mx-auto h-8 text-md text-gray-600 hover:text-white active:text-white border-1 border-gray-600 bg-white hover:bg-gray-600 w-30 rounded flex items-center justify-center duration-300',
	radioLabel: 'px-4 py-2 border rounded-lg cursor-pointer transition-colors',
	radioLabelActive: 'bg-gray-500 text-white border-gray-500',
}

export const verificationButtonStyles = `
    w-60 md:w-80 group relative flex flex-col items-center justify-center p-3 
    border-2 border-gray-200 rounded-xl hover:border-gray-500
    cursor-pointer duration-300
  `

export const iconContainerStyles = `
    p-3 mb-4 rounded-full bg-[#ededed] 
    group-hover:bg-gray-500 duration-300
  `
