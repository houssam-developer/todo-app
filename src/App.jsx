
import { useEffect, useRef, useState } from 'react';
import Footer from './components/Footer';
import { v4 as uuidv4 } from 'uuid';


function App() {
	const [tasks, setTasks] = useState([
		{ id: uuidv4(), tag: 'Do coding challenges', state: 'completed', },
		{ id: uuidv4(), tag: 'Finish the project', state: 'active', },
		{ id: uuidv4(), tag: 'Apply to main jobs', state: 'active', },
		{ id: uuidv4(), tag: 'Apply to secondary jobs', state: 'active', },
	]);

	function handleCheckboxOnChangeEvent(e, targetTask) {
		console.log('checkbox handler: ', e.target.checked);
		const updatedTask = tasks.filter(it => it.id === targetTask.id)[0];
		console.log('updatedTask: ', updatedTask);
		if (e.target.checked) { updatedTask.state = 'completed' }
		else { updatedTask.state = 'active'; }

		const updatedTasks = tasks.map(it => {
			if (it.id === updatedTask.id) { return updatedTask }
			return it;
		});

		setTasks(updatedTasks);
	}

	return (
		<div className="flex flex-col items-center gap-10 max-w-[768px] mx-auto px-2 py-6 border-4 border-orange-400 h-screen">
			<h1 className='text-center'>#todo</h1>

			<main className='w-full max-w-[608px] mx-auto flex flex-col gap-5'>
				<nav className='border-b-[1px] border-[#bdbdbd] flex justify-around w-full pb-3 font-sans font-semibold text-[#333] text-sm'>
					<button>All</button>
					<button>Active</button>
					<button>Completed</button>
				</nav>

				<form className="container-all flex gap-4 sm:gap-6 md:gap-8">
					<input className='max-w-[55vw] sm:max-w-none border-[1px] flex-grow  py-3 px-2 focus:outline-1 rounded-xl  text-sm' type="text" placeholder='add details' />
					<button className='bg-[#2F80ED] text-white px-8 py-2 rounded-xl text-sm'>Add</button>
				</form>

				<form className="hidden container-active"></form>
				<form className="hidden container-completed"></form>

				<ul>
					{
						tasks.map(it =>
							<li key={it.id} className='flex items-center gap-4'>
								<form className='flex items-center gap-2'>
									<input type="checkbox" id={`${it.id}`} checked={it.state === 'completed' ? true : false} onChange={(e) => handleCheckboxOnChangeEvent(e, it)} />
									<label className={`font-sans text-lg font-medium ${it.state === 'completed' ? 'line-through' : ''}`} htmlFor={`${it.id}`}>{it.tag}</label>
								</form>
							</li>
						)
					}
				</ul>

			</main>






			{/* <Footer></Footer> */}
		</div>
	)
}

export default App;
