import { Link } from "react-router-dom"

const PreviewProject = ({project}) => {

    const { name, _id, customer} = project
    return (
        <div className="border-b p-5 flex">
            <p>
                {name}
            </p>

            <Link
                to={`${_id}`}
            >See Project</Link>
        </div>
    )
}

export default PreviewProject
