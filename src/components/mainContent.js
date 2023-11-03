import React, { useState,useEffect } from 'react';

const MainContent = () => {
    const [prod, setProd] = useState([]);
  const [products, setProducts] = useState([]);
  const url = 'https://dummyjson.com/products?limit=30';

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProd(data.products);
        setProducts(data.products); // Set products after fetching data
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [url]);
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('ascending');
    const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
    const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const isMobile = window.innerWidth <= 600;
    const [productsPerPage] = useState(isMobile ? 3 : 6);

    const handleFilter = (category) => {
        if (category === 'All') {
            setProducts(prod);
        } else {
            const filteredProducts = prod.filter((product) => product.category === category);
            setProducts(filteredProducts);
        }
        setFilter(category);
        setFilterDropdownVisible(false);
    };

    const handleSort = (order) => {
        const sortedProducts = [...products];
        if (order === 'ascending') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        setProducts(sortedProducts);
        setSort(order);
        setSortDropdownVisible(false);
    };

    const categoryBut = ['All'];
    prod.map((item)=>categoryBut.push(item.category))
    const categoryButtons = [];

    categoryBut.forEach((item) => {
    if (!categoryButtons.includes(item)) {
        categoryButtons.push(item);
    }
    });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const listItems = currentProducts.map((item) => (
        <div className="card" key={item.id}>
            <div className="card_img">
                <img src={item.thumbnail} alt={item.title} />
            </div>
            <div className="card_header">
                <h2>{item.title}</h2>
                <p>{item.category}</p>
                <p className="price">
                    {item.price}
                    <span>$</span>
                </p>
                <div className="btn">Add to cart</div>
            </div>
        </div>
    ));
    const totalPages = Math.ceil(products.length / productsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => (
        <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? 'active' : ''}
            id='bnh'
        >
            {number}
        </button>
    ));

    return (
        <div className="full">
            <div className="filter-sort-dropdowns">
                <div className="dropdown">
                    <button onClick={() => setFilterDropdownVisible(!filterDropdownVisible)}>
                        Filter by Category
                    </button>
                    {filterDropdownVisible && (
                        <div className="dropdown-content">
                            {categoryButtons.map((category) => (
                                <button key={category} onClick={() => handleFilter(category)}>
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className="dropdown">
                    <button onClick={() => setSortDropdownVisible(!sortDropdownVisible)}>
                        Sort by Price
                    </button>
                    {sortDropdownVisible && (
                        <div className="dropdown-content">
                            <button onClick={() => handleSort('ascending')}>Ascending</button>
                            <button onClick={() => handleSort('descending')}>Descending</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="main_content">
                {listItems}
            </div>
            <div className="pagination">
                {renderPageNumbers}
            </div>
        </div>
    );
};

export default MainContent;
