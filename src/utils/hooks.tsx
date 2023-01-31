import {useState} from 'react'

export const useForm = (callback: Function, initialState: any) =>{
    const [values, setValues] = useState(initialState)
    const onChange = (e: any): void => {
        setValues({ ...values, [e?.target?.name]: e?.target?.value });
      };
      const onSubmit = (e: any) => {
        e.preventDefault();
        callback();
      }

      return {
        onChange,
        onSubmit,
        values
      }
}