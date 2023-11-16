import {useForm} from "react-hook-form";
import useRecoverPasswordLink from "../../../hooks/useRecoverPasswordLink";
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'



const RecoverForm = () => {
  
  const{register, handleSubmit, formState:{errors}} = useForm();
  const { mutate} = useRecoverPasswordLink();

  const onSubmit =(data) => {
   console.log(data)
   mutate({ email: data.email})
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="d-flex flex-column fw-bold mb-3">
      <label className="form-label fw-bold">Correo electrónico</label>
      <input 
      type="email" 
      className="border border-primary rounded-5 px-3" 
      placeholder="ingresa tu correo"
      {...register('email', {
        required: {
            value: true,
            message: "este campo es requerido"
        },
        pattern: {
            value:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: "Debes ingresar un correo valido"
        }
      })}/>
     {errors.email && <p className="text-danger small" >{errors.email.message}</p>}
     </div>
     <button type="submit" className="text-bg-primary w-100 mb-3 mt-3 border border-primary rounded-5">
        Enviar
      </button>
      <Link className="text-decoration-none" to="/"><p className="text-center text-primary small">Ir al inicio</p></Link>
      <Toaster />
  </form>
  )
}

export default RecoverForm