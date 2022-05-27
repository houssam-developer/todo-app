
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

	const [flagAll, setFlagAll] = useState(false);
	const [flagActive, setFlagActive] = useState(false);
	const [flagCompleted, setFlagCompleted] = useState(false);

	const btnAllRef = useRef();
	const btnActiveRef = useRef();
	const btnCompletedRef = useRef();

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

	function handleBtnAll(e) {
		//e.target.classList.add('btn-active');
		console.log('handleBtnAll()');
		console.log(btnAllRef);

		setFlagActive(false);
		setFlagCompleted(false);
		setFlagAll(true);

		btnActiveRef.current.classList.remove('btn-active');
		btnCompletedRef.current.classList.remove('btn-active');
		btnAllRef.current.classList.add('btn-active');

	}

	function handleBtnActive(e) {
		console.log('handleBtnActive()');
		console.log(btnActiveRef);


		setFlagAll(false);
		setFlagCompleted(false);
		setFlagActive(true);

		btnAllRef.current.classList.remove('btn-active');
		btnCompletedRef.current.classList.remove('btn-active');
		btnActiveRef.current.classList.add('btn-active');

	}

	function handleBtnCompleted(e) {
		console.log('handleBtnCompleted()');
		console.log(btnCompletedRef);


		setFlagAll(false);
		setFlagActive(false);
		setFlagCompleted(true);

		btnAllRef.current.classList.remove('btn-active');
		btnActiveRef.current.classList.remove('btn-active');
		btnCompletedRef.current.classList.add('btn-active');

	}

	return (
		<div className="flex flex-col items-center gap-10 max-w-[768px] mx-auto px-2 py-6 border-4 border-orange-400 h-screen">
			<h1 className='text-center'>#todo</h1>

			<main className='w-full max-w-[608px] mx-auto flex flex-col gap-5'>
				<nav className='border-b-[1px] border-[#bdbdbd] flex justify-around w-full pb-3 font-sans font-semibold text-[#333] text-sm'>
					<button ref={btnAllRef} className='border-b-2 border-transparent' onClick={handleBtnAll}>All</button>
					<button ref={btnActiveRef} className='border-b-2 border-transparent' onClick={handleBtnActive}>Active</button>
					<button ref={btnCompletedRef} className='border-b-2 border-transparent' onClick={handleBtnCompleted}>Completed</button>
				</nav>

				{flagAll && <Tasks />}
				{flagActive && <Tasks type='active' />}
				{flagCompleted && <TasksCompleted />}

			</main>

			{/* <Footer></Footer> */}
		</div>
	)

	function Tasks({ type = '' }) {
		return (
			<div className='w-full max-w-[608px] mx-auto flex flex-col gap-5'>
				<form className="container-all flex gap-4 sm:gap-6 md:gap-8">
					<input className='max-w-[55vw] sm:max-w-none border-[1px] flex-grow  py-3 px-2 focus:outline-1 rounded-xl  text-sm' type="text" placeholder='add details' />
					<button className='bg-[#2F80ED] text-white px-8 py-2 rounded-xl text-sm'>Add</button>
				</form>

				<ul className='flex flex-col gap-2'>
					{
						tasks
							.filter(it => type === '' ? it : it.state === type)
							.map(it =>
								<li key={it.id} className='flex items-center gap-4'>
									<form className='flex items-center gap-2'>
										<input type="checkbox" id={`${it.id}`} checked={it.state === 'completed' ? true : false} onChange={(e) => handleCheckboxOnChangeEvent(e, it)} />
										<label className={`text-[#333] font-sans text-lg font-medium ${it.state === 'completed' ? 'line-through' : ''}`} htmlFor={`${it.id}`}>{it.tag}</label>
									</form>
								</li>
							)
					}
				</ul>
			</div>
		)
	}

	function TasksCompleted() {
		return (
			<div className='w-full max-w-[608px] mx-auto flex flex-col gap-5'>
				<form className="container-all flex gap-4 sm:gap-6 md:gap-8">
					<input className='max-w-[55vw] sm:max-w-none border-[1px] flex-grow  py-3 px-2 focus:outline-1 rounded-xl  text-sm' type="text" placeholder='add details' />
					<button className='bg-[#2F80ED] text-white px-8 py-2 rounded-xl text-sm'>Add</button>
				</form>

				<ul className='flex flex-col gap-2'>
					{
						tasks
							.filter(it => it.state === 'completed')
							.map(it =>
								<li key={it.id} className='flex items-center gap-4 w-full'>
									<form className='flex justify-between gap-2 w-full'>
										<div className='flex items-center gap-2'>
											<input type="checkbox" id={`${it.id}`} checked={it.state === 'completed' ? true : false} onChange={(e) => handleCheckboxOnChangeEvent(e, it)} />
											<label className={`text-[#333] font-sans text-lg font-medium ${it.state === 'completed' ? 'line-through' : ''}`} htmlFor={`${it.id}`}>{it.tag}</label>
										</div>
										<button className=''>
											<svg className='w-[24px] h-[24px] text-[#444]' viewBox="0 0 24 24">
												<path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
											</svg>
										</button>
									</form>
								</li>
							)
					}
				</ul>
				<button className='ml-auto flex gap-2 bg-[#EB5757] justify-start items-center max-w-max text-[#fff] px-6 py-3 rounded font-sans text-[12px] font-semibold'>
					<svg className='w-[14px] h-[14px] ' viewBox="0 0 24 24">
						<path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
					</svg>
					<span>delete all</span>
				</button>
			</div>
		)
	}
}

export default App;
