import Link from "next/link";
//18.11.9
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
export const getStaticProps: GetStaticProps = async ()  => {
    const requestOptions = {
        method: 'GET',
        headers: { accept: 'application/json','Content-Type': 'application/json' }
    };
    const res = await fetch('http://127.0.0.1:8000/api/books',requestOptions);
    const data = await res.json();
    console.log(data);
    return {
        props:{
            books: data   
        }
    }
  }
  /*
export async function getStaticProps(){
    const res = await fetch('http://localhost:8000/api/books', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'content-type':'application/json'
        },
      });
    const data = await res.json();
    return {
        props:{
            books: data   
        }
    }
}*/
const  BookList = ({books})=>{
    async  function  handleDelete(e,bookID) {
        e.preventDefault();
        const res = await  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookID}`,{
            method:'POST',
            headers:{
                accept: 'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify({
                _method: 'DELETE'
            })
        });
        if (res.ok){
            window.location.href ='/libros';
        }
    }

    return  (
        <div>
            <h1>Libros</h1>
            <ul data-cy='book-list'>
                {books.map( book =>(
                    <li key={`book-${book.id}`}>
                        <Link href={`/libros/${book.id}`}
                         data-cy={`link-to-visit-book-${book.id}`} >{book.title}</Link>
                        {' - '}
                        <Link href={`/libros/${book.id}/editar`}
                         data-cy={`link-to-edit-book-${book.id}`}> Editar</Link>
                        {' - '}
                        <form onSubmit={(e)=>handleDelete(e,book.id)}>
                            <button data-cy={`link-to-delete-book-${book.id}`}>
                                Eliminar
                            </button>
                        </form>
                    </li>
                ))}
            </ul>
            <Link href="/libros/crear">Crear Libro</Link>
        </div>
    )
}
export default BookList;