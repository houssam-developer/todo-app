
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


function App() {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const tasksSaved = JSON.parse(localStorage.getItem('tasks'));

		if (tasksSaved) {
			setTasks(tasksSaved);
		}
	}, []);

	useEffect(() => {
		if (tasks.length > 0) {
			localStorage.setItem('tasks', JSON.stringify(tasks));
		}
	}, [tasks]);


	const [flagAll, setFlagAll] = useState(true);
	const [flagActive, setFlagActive] = useState(false);
	const [flagCompleted, setFlagCompleted] = useState(false);

	const btnAllRef = useRef();
	const btnActiveRef = useRef();
	const btnCompletedRef = useRef();

	function handleCheckboxOnChangeEvent(e, targetTask) {

		const updatedTask = tasks.filter(it => it.id === targetTask.id)[0];

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



		setFlagActive(false);
		setFlagCompleted(false);
		setFlagAll(true);

		btnActiveRef.current.classList.remove('btn-active');
		btnCompletedRef.current.classList.remove('btn-active');
		btnAllRef.current.classList.add('btn-active');

	}

	function handleBtnActive(e) {




		setFlagAll(false);
		setFlagCompleted(false);
		setFlagActive(true);

		btnAllRef.current.classList.remove('btn-active');
		btnCompletedRef.current.classList.remove('btn-active');
		btnActiveRef.current.classList.add('btn-active');

	}

	function handleBtnCompleted(e) {




		setFlagAll(false);
		setFlagActive(false);
		setFlagCompleted(true);

		btnAllRef.current.classList.remove('btn-active');
		btnActiveRef.current.classList.remove('btn-active');
		btnCompletedRef.current.classList.add('btn-active');
	}

	function handleNewTaskEvent(e) {
		e.preventDefault();
		const formData = new FormData(e.target);

		const taskData = Array.from(formData.entries()).map(it => it);
		const newTaskTag = taskData[0][0] === 'new-task' ? taskData[0][1] : '';

		if (newTaskTag === '') { return; }

		const newTask = { id: uuidv4(), tag: newTaskTag, state: 'active' };

		setTasks([newTask, ...tasks]);
	}

	function handleBtnDeleteOneTaskEvent(e, targetTask) {
		e.preventDefault();

		const updatedTasks = tasks.filter(it => it.id !== targetTask.id);
		setTasks(updatedTasks);
	}

	function handleBtnDeleteAllEvent(e) {
		e.preventDefault();


		const updatedTasks = tasks.filter(it => it.state !== 'completed');
		setTasks(updatedTasks);
	}

	return (
		<div className="flex flex-col items-center gap-10 max-w-[768px] mx-auto px-2 py-6 h-screen">
			<h1 className='text-center'>#todo</h1>

			<main className='w-full max-w-[608px] mx-auto flex flex-col gap-5 flex-grow'>
				<nav className='border-b-[1px] border-[#bdbdbd] flex justify-around w-full pb-3 font-sans font-semibold text-[#333] text-sm'>
					<button ref={btnAllRef} className='btn-active border-b-2 border-transparent' onClick={handleBtnAll}>All</button>
					<button ref={btnActiveRef} className='border-b-2 border-transparent' onClick={handleBtnActive}>Active</button>
					<button ref={btnCompletedRef} className='border-b-2 border-transparent' onClick={handleBtnCompleted}>Completed</button>
				</nav>

				{flagAll && <Tasks fnNewTaskEvent={handleNewTaskEvent} />}
				{flagActive && <Tasks type='active' fnNewTaskEvent={handleNewTaskEvent} />}
				{flagCompleted && <TasksCompleted fnDeleteOneTask={handleBtnDeleteOneTaskEvent} fnDeleteAll={handleBtnDeleteAllEvent} />}

			</main>

			<footer>
				<p className="text-[#4f4f4f] text-center p-4 font-medium">created by <span className='font-bold'>houssam-developer</span> - devChallenges.io</p>
			</footer>
		</div>
	)

	function Tasks({ type = '', fnNewTaskEvent }) {
		return (
			<div className='w-full max-w-[608px] mx-auto flex flex-col gap-5'>
				<form className="container-all flex gap-4 sm:gap-6 md:gap-8" onSubmit={fnNewTaskEvent}>
					<input name='new-task' className='max-w-[55vw] sm:max-w-none border-[1px] flex-grow  py-3 px-2 focus:outline-1 rounded-xl  text-sm' type="text" placeholder='add details' />
					<button type='submt' className='bg-[#2F80ED] text-white px-8 py-2 rounded-xl text-sm'>Add</button>
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

	function TasksCompleted({ fnDeleteOneTask, fnDeleteAll }) {

		return (
			<div className='w-full max-w-[608px] mx-auto flex flex-col gap-5'>
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
										<button onClick={(e) => fnDeleteOneTask(e, it)}>
											<svg className='w-[24px] h-[24px] text-[#444]' viewBox="0 0 24 24">
												<path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
											</svg>
										</button>
									</form>
								</li>
							)
					}
				</ul>
				{
					tasks.filter(it => it.state === 'completed').length > 0 ?
						<button onClick={fnDeleteAll} className='ml-auto flex gap-2 bg-[#EB5757] justify-start items-center max-w-max text-[#fff] px-6 py-3 rounded font-sans text-[12px] font-semibold'>
							<svg className='w-[14px] h-[14px] ' viewBox="0 0 24 24">
								<path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
							</svg>
							<span>delete all</span>
						</button> : ''
				}
			</div>
		)
	}
}

export default App;
