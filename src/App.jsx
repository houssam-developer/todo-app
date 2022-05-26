
import { useEffect, useRef, useState } from 'react';
import Footer from './components/Footer'


function App() {

	return (
		<div className="flex flex-col items-center gap-10 max-w-[768px] mx-auto px-2 py-6 border-4 border-orange-400 h-screen">
			<h1 className='text-center'>#todo</h1>

			<main className='w-full max-w-[608px] mx-auto flex flex-col gap-10'>
				<nav className='border-b-[1px] border-[#bdbdbd] flex justify-around w-full pb-3 font-sans font-semibold text-[#333] text-sm'>
					<button>All</button>
					<button>Active</button>
					<button>Completed</button>
				</nav>

				<form className="container-all flex gap-4 sm:gap-6 md:gap-8">
					<input className='border-[1px] flex-grow  py-3 px-2 focus:outline-1 rounded-xl  text-sm' type="text" placeholder='add details' />
					<button className='bg-[#2F80ED] text-white px-8 py-2 rounded-xl text-sm'>Add</button>
				</form>

				<form className="container-active"></form>
				<form className="container-completed"></form>

			</main>






			{/* <Footer></Footer> */}
		</div>
	)
}

export default App;
