import { useForm } from "react-hook-form";

export default function AddEditProject({ addProject, editProject, editId, isEdit }) {

    const { register, handleSubmit, errors, reset } = useForm();
    const onSubmit = data => {
        if (isEdit) {
            editProject(data)
        } else {
            // console.log(data);
            addProject(data);
        }
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ 'margin': '16px 0' }}>
            { isEdit && <h5>Edit item with id: {editId}</h5>}
            <div style={{ 'margin': '8px 0' }}>
                <label>Name</label> <br />
                <input style={{ 'padding': '8px', 'margin': '8px 0', 'width': '50%' }}
                    name="name" ref={register({ required: true })} />
                {errors.name && <p>Name is required</p>}
            </div>
            <div style={{ 'margin': '8px 0' }}>
                <label>Description</label> <br />
                <input style={{ 'padding': '8px', 'margin': '8px 0', 'width': '50%' }}
                    name="description" ref={register({ required: true })} />
                {errors.description && <p>Description field is required</p>}
            </div>

            <input type="submit" />
        </form>
    );
}