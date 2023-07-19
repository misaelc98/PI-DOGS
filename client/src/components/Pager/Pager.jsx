import React from "react";
import style from "./Pager.module.css";

export default function Paginate({ dogsPerPage, allDogs, paginado }) {

    const pageNumbers =[];

    // function pageChange(e) {
    //     if (e === "NEXT") {
    //       if (currentPage < pages) {
    //         dispatch(change_page(currentPage + 1));
    //       }
    //     } else {
    //       if (currentPage > 1) {
    //         dispatch(change_page(currentPage - 1));
    //       }
    //     }
    //   }

    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) { //cantidad de elementos totales, dividido limite de elementos por pagina
        pageNumbers.push(i);
    }

    return(
        <nav >
            <ul className={`${style.ul_container}`}>
                { pageNumbers && pageNumbers.map(number => (
                    <li className={`${style.li_container}`} onClick={() => paginado(number)} key={number}>
                    
                         <button type="button">{number}</button> 
                    
                    </li>
                ))}
            </ul>
        </nav>
    )
}