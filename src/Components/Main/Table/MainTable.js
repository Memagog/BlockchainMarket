import React,{useState, useEffect} from 'react'
import { ImPlus } from 'react-icons/im';
import { Modal } from 'react-bootstrap';
import BuyForm from '../BuyForm/BuyForm';
import { mainData , selectCoin } from './../../../redux/mainSlice';
import { useDispatch , useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ReactPaginate from "react-paginate";
import "./Pagination.scss"

export default function MainTable() {

    const history  = useHistory();

    const dispatch = useDispatch();  
    const main = useSelector(mainData);
    
    const [len, setLen] = useState(0);
    const [show, setShow] = useState(false);
    const [coin, setCoin] = useState({});    
    const [currentPage, setCurrentPage] = useState(0)
    const [perPage, setPerPage] = useState(20);  

    const pageVisited = currentPage * perPage;
    const pageCount = Math.ceil(len/ perPage);

    const handleClose = () => setShow(false);

    useEffect(() => {
        setLen(main.data.coins.length)   
    }, [main])

    const handleShow = (target) =>{
        setCoin(target);         
        setShow(true);       
    }     

    const checkCoin = (target) => {
        dispatch(selectCoin(target))
        history.push("/coin")
    }   

    const changePage = ({ selected }) => {
       setCurrentPage(selected);
    };

  

    return (
        <div>       
                <div>
                        <table className="table table-dark table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">№</th>
                                    <th scope="col">Coin</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Max value</th>
                                    <th scope="col">Symbol</th>
                                    <th scope="col">Add</th>
                                </tr>
                            </thead>                            
                                <tbody>
                                    {                            
                                        main.data.coins.slice(pageVisited, pageVisited + perPage).map((el,i) => 
                                            <tr key={i}>
                                                <th scope="row" onClick={()=>checkCoin(el)}>{el.rank}</th>
                                                    <td onClick={()=>checkCoin(el)}>{el.name}</td>
                                                    <td onClick={()=>checkCoin(el)}>{el.priceUsd}</td>
                                                    <td onClick={()=>checkCoin(el)}>{el.vwap24Hr}</td>    
                                                    <td onClick={()=>checkCoin(el)}>{el.symbol}</td>
                                                <td><ImPlus className="button-plus" onClick={()=>handleShow(el)}></ImPlus></td>  
                                            </tr>           
                                        )                          
                                    }                                
                                </tbody>
                        </table>

                        <div className="paginationBttns"> 
                            <p className="paginationRow">{pageVisited+1 + " - "}{pageVisited+perPage}</p>           
                            <ReactPaginate
                                previousLabel={"<"}
                                nextLabel={">"}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"paginationBttnsContainer"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                            />                 
                        </div>          
                    
                        <>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Buy Modal Window</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <BuyForm name={coin.name} priceUsd={coin.priceUsd} changePercent={coin.changePercent24Hr}></BuyForm>
                                </Modal.Body>
                                <Modal.Header> 
                                    <Modal.Title>{coin.name} ${coin.priceUsd|0}</Modal.Title> 
                                </Modal.Header>
                            </Modal>
                        </>
                    </div>            
            </div>
    )
}
