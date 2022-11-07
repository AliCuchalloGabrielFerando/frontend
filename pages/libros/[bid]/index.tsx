import Link from "next/link";
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
const BookDetail = ({book}) => {
  return (
      <>
      <h1>{book.title}</h1>
        <Link href="/libros">Book List</Link>  
      </>
  )
};
export default BookDetail;