
export default function TaskList({tasks}) {
    return (
        <div className='bg-gray-400 flex flex-col'>
            {tasks.data && tasks.data.map((task) => (
                <div className="bg-gray-200 border-4 border-gray-800" key={task.id}>
                    <h2>{task.projectId}</h2>
                    <p>{task.description}</p>
                </div>
            ))}
        </div>

        )
}