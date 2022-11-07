import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/router";

const BookCreate = () => {
    const router = useRouter();
    const [bookName,setBookName]=useState('');
    const [errors,setErrors]=useState([]);
    const [sending,setSending]=useState(false);
    async function handleSubmit(e) {
        e.preventDefault();
        setSending(true);
        const res = await  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/`,{
            method:'POST',
            headers:{
                accept: 'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify({
                title:bookName
            })
        });
        if (res.ok){
            setErrors([]);
            setBookName('');
            return router.push('/libros');
        }else{
            setSending(false);
            const data = await res.json();
            setErrors(data.errors);
        }

    }

    return (
      <>
          Book crear
          <form onSubmit={handleSubmit}>
              <input onChange={(e)=> setBookName(e.target.value)}
                    data-cy='input-book-title' value={bookName} type="text" disabled={sending}/>
              <button  
              disabled={sending} data-cy='button-submit-book'>
                {sending? 'Enviando...':'Enviar'}
                </button>
              {errors.title &&(
                <span style={{color:'red', display:'block'}}>
                  {errors.title}  
                </span>
              )}
          </form>
          <Link href="/libros">Book List</Link>
      </>
  )
};
export default BookCreate;