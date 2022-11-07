import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/router";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
export const getServerSideProps: GetServerSideProps = async ({params})  => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    const res = await fetch(`http://127.0.0.1:8000/api/books/${params.bid}`,requestOptions);
    const data = await res.json();
    return {
        props:{
            book: data   
        }
    }
  }

const BookEdit = ({book}) => {
    const router = useRouter();
    const [bookName,setBookName]=useState(book.title);
    const [errors,setErrors]=useState([]);
    const [sending,setSending]=useState(false);
    async function handleSubmit(e) {
        e.preventDefault();
        setSending(true);
        const res = await  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book.id}`,{
            method:'POST',
            headers:{
                accept: 'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify({
                title:bookName,
                _method: 'PATCH'
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
            Book Editar
            <form onSubmit={handleSubmit}>
                <input onChange={(e)=> setBookName(e.target.value)}
                 data-cy='input-book-title'
                       value={String(bookName)} type="text" disabled={sending}/>
                <button data-cy='button-submit-book' disabled={sending}>{sending? 'Enviando...':'Enviar'}</button>
            </form>
            <Link href="/libros">Book List</Link>
        </>
    )
};
export default BookEdit;