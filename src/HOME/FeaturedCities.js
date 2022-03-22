import React, { useState } from 'react'
import { Link } from 'react-router-dom'

 const FeaturedCities = () => {
    return (
        <div> 
<div id="sec3">
<div className="container text-center">
    <h2 className="pb-2">Jobs By Locations</h2>
    <p className="pb-3">20+ Featured Cities Added Jobs</p>
    <div className="row mt-2">
        <div className="col-lg-3 col-md-6 mb-4">
            <Link to={`/browsefilterlist?locate=hyderabad`}>
            <div className="card img-fluid city">
                <img className="card-img-top" src="images/card 1.jpg" alt="" />
                <div className="card-img-overlay">
                    <div className="card-body text-left text-white">
                        <h4 className="card-title">Hyderabad</h4>
                        {/* <p>50 Jobs</p> */}
                    </div>
                </div>
            </div>
            </Link>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
            <Link to={`/browsefilterlist?locate=mumbai`}>
            <div className="card img-fluid city">
                <img className="card-img-top" src="images/card 2.jfif" alt="" />
                <div className="card-img-overlay">
                    <div className="card-body text-left text-white">
                        <h4 className="card-title">Mumbai</h4>
                        {/* <p>50 Jobs</p> */}
                    </div>
                </div>
            </div>
            </Link>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
            <Link to={`/browsefilterlist?locate=chennai`}>
            <div className="card img-fluid city">
                <img className="card-img-top" src="images/card 3.jpg" alt="" />
                <div className="card-img-overlay">
                    <div className="card-body text-left text-white ">
                        <h4 className="card-title">Chennai</h4>
                        {/* <p>50 Jobs</p> */}
                    </div>
                </div>
            </div>
            </Link>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
            <Link to={`/browsefilterlist?locate=pune`}>
            <div className="card img-fluid city">
                <img className="card-img-top" src="images/card 4.jpg" alt="" />
                <div className="card-img-overlay">
                    <div className="card-body text-left text-white">
                        <h4 className="card-title">Pune</h4>
                        {/* <p>50 Jobs</p> */}
                    </div>
                </div>
            </div>
            </Link>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
            <Link to={`/browsefilterlist?locate=bangalore`}>
            <div className="card img-fluid city">
                <img className="card-img-top" src="images/card 5.jpg" alt="" />
                <div className="card-img-overlay">
                    <div className="card-body text-left text-white">
                        <h4 className="card-title">Bangalore</h4>
                        {/* <p>50 Jobs</p> */}
                    </div>
                </div>
            </div>
            </Link>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
            <Link to={`/browsefilterlist?locate=delhi`}>
            <div className="card img-fluid city">
                <img className="card-img-top" src="images/card 6.jpg" alt="" />
                <div className="card-img-overlay">
                    <div className="card-body text-left text-white">
                        <h4 className="card-title">Delhi</h4>
                        {/* <p>50 Jobs</p> */}
                    </div>
                </div>
            </div>
            </Link>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
            <Link to={`/browsefilterlist?locate=kolkata`}>
            <div className="card img-fluid city">
                <img className="card-img-top" src="images/card 7.jpg" alt="" />
                <div className="card-img-overlay">
                    <div className="card-body text-left text-white">
                        <h4 className="card-title">Kolkata</h4>
                        {/* <p>50 Jobs</p> */}
                    </div>
                </div>
            </div>
            </Link>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
            <Link to={`/browsefilterlist?locate=ahmedabad`}>
            <div className="card img-fluid city">
                <img className="card-img-top" src="images/card 8.jpg" alt="" />
                <div className="card-img-overlay">
                    <div className="card-body text-left text-white">
                        <h4 className="card-title">Ahmedabad</h4>
                        {/* <p>50 Jobs</p> */}
                    </div>
                </div>
            </div>
            </Link>
        </div>
    </div>
    <Link to="/locationaljobs" className='float-right All-Links'><i class="fas fa-arrow-right pr-2"></i> View All Locations</Link>
</div>

</div>

        </div>
    )
}

export default FeaturedCities