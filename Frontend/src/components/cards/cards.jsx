import React, { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import ReactPaginate from 'react-paginate';
import './cards.css'
import axios from 'axios';

function Items({ currentItems, user, cart }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems([...cartItems, ...cart])
  }, [cart])

  const handleToggleCart = async (itemId) => {
    const value = { itemId, user };
    if (cartItems.includes(itemId)) {
      try {
        const res = await axios.post('http://localhost:3000/removecart', value)
        if (res.status == 200) {
          setCartItems(cartItems.filter((id) => id !== itemId));
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      try {
        const res = await axios.post('http://localhost:3000/addtocart', value)
        if (res.status == 200) {
          setCartItems([...cartItems, itemId]);
        }
      } catch (er) {
        console.log(er)
      }
    }
  };


  return (
    <>
      {currentItems &&
        currentItems.map((val) => (
          <div className="col" key={val.product_id}>
            <div className="card">
              <img
                src={val.product_id}
                className="card-img-top imgcss"
              />
              <div className="card-body">
                <div className='d-flex justify-content-between md-2'>
                  <h5 className="card-title">{val.name}</h5>
                  <h6>Price : {val.price}</h6>
                </div>
                <p className="card-text">
                  {val.description}
                </p>

                {cartItems.includes(val.product_id) ?
                  <button className='btn btn-secondary' onClick={() => handleToggleCart(val.product_id)} >Remove from Cart</button> :
                  <button className='btn btn-success' onClick={() => handleToggleCart(val.product_id)} >Add to Cart</button>}



              </div>
            </div>
          </div>
        ))}
    </>
  );
}

function cards({ itemsPerPage, user }) {
  const [itemOffset, setItemOffset] = useState(0);
  const [items, setItems] = useState([]);
  const [cart, setCartItems] = useState([]);

  useEffect(() => {
    getData();
    getCart();
  }, [])

  async function getCart() {
    try {
      let res = await axios.post('http://localhost:3000/getCart', { user: user })
      setCartItems(res.data)
    } catch (e) {
      console.log(e)
    }
  }
  let res = [];
  items.map(val => {
    cart.map(v => {
      if (v.product_id == val.product_id) {
        res.push(val.product_id)
      }
    })
  })


  async function getData() {
    try {

      let res = await axios.get('http://localhost:3000/getProducts');
      setItems(res.data)

    } catch (error) {
      console.log(error)
    }
  }


  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 ml-2 mt-4 p-4 w-100 d-flex justify-content-center">
        <Items currentItems={currentItems} user={user} cart={res} />
      </div>

      <div className='d-flex justify-content-center'
        style={{
          padding: 10,
          boxSizing: 'border-box',
          width: '100%',
          height: '100%',
        }}
      >
        <ReactPaginate
          activeClassName={'item activ '}
          breakClassName={'item break-me '}
          breakLabel={'...'}
          containerClassName={'pagination'}
          disabledClassName={'disabled-page'}
          marginPagesDisplayed={2}
          nextClassName={"item next "}
          nextLabel={<ArrowForwardIosIcon style={{ fontSize: 25, width: 100 }} />}
          onPageChange={handlePageClick}
          pageCount={pageCount}
          pageClassName={'item pagination-page '}
          pageRangeDisplayed={2}
          previousClassName={"item previous"}
          previousLabel={<ArrowBackIosIcon style={{ fontSize: 25, width: 100 }} />}
        />
      </div>
    </>
  );
}

export default cards;
