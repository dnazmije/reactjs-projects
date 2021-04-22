import { useForm } from "react-hook-form";
import { useState } from 'react';

export default function AddTime({ addTime }) {

    const [amount, setAmount] = useState(0);
    const { register, handleSubmit, errors, reset } = useForm();
    const onSubmit = data => {
        // console.log(data);
        addTime(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h4>Add time</h4>

            <div style={{ 'margin': '8px 0' }}>
                <label>Amount (in hours)</label> <br />
                <input style={{ 'padding': '8px', 'margin': '8px 0', 'width': '50%' }}
                    type="number" name="amount" defaultValue={amount} ref={register({ required: true })} />
                {errors.amount && <p>Amount field is required</p>}
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