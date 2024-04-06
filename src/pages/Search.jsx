import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import Spinner from "../components/Spinner";
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    where,
  } from "firebase/firestore";
import { db } from '../firebase';
export default function Search() {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
      searchTerm: '',
      type: 'all',
      parking: false,
      furnished: false,
      offer: false,
      sort: 'created_at',
      order: 'desc',
    });
    
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);
    console.log(listings);
    useEffect(()=>{
        const urlParams=new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (
        searchTermFromUrl ||
        typeFromUrl ||
        parkingFromUrl ||
        furnishedFromUrl ||
        offerFromUrl ||
        sortFromUrl ||
        orderFromUrl
        ){
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }

        async function fetchListings() {
            setLoading(true);
            setShowMore(false);
            try {
                const listingsRef = collection(db, "listings");
                const urlParams=new URLSearchParams(window.location.search)
                
                const searchTermFromUrl = urlParams.get('searchTerm');
                const typeFromUrl = urlParams.get('type');
                const parkingFromUrl = urlParams.get('parking');
                const furnishedFromUrl = urlParams.get('furnished');
                const offerFromUrl = urlParams.get('offer');
                const sortFromUrl = urlParams.get('sort');
                const orderFromUrl = urlParams.get('order');

                const filters = [];
                if(searchTermFromUrl) {
                    filters.push(where("name", "==", searchTermFromUrl))
                }
                if(typeFromUrl){
                    filters.push(where("type", "==", typeFromUrl))
                }
                if(parkingFromUrl){
                    filters.push(
                        where("parking", "==", parkingFromUrl)
                    )
                }
                if(furnishedFromUrl){
                    filters.push(
                        where("furnished", "==", furnishedFromUrl)
                    )
                }
                if(offerFromUrl){
                    filters.push(
                        where("offer", "==", offerFromUrl)
                    )
                }

                // const q = query(listingsRef, 
                //     ...filters,
                //     orderBy(sortFromUrl, orderFromUrl),
                //     limit(8)
                // );

                const q = query(listingsRef, 
                        "filters",
                        // ...filters,
                        // orderBy(sortFromUrl, orderFromUrl),
                        orderBy("timestamp", "desc"),
                        limit(8)
                    );

                const querySnap = await getDocs(q);
                const listings = [];
                querySnap.forEach((doc) => {
                    return listings.push({
                    id: doc.id,
                    data: doc.data(),
                    });
                });
                console.log(listings);
                setListings(listings);
                setLoading(false);
            }
            
            catch (error) {
                console.log(error);
            }
        }    
        fetchListings();
    },[window.location.search])
  
    const handleChange = (e) => {
        if (
          e.target.id === 'all' ||
          e.target.id === 'rent' ||
          e.target.id === 'sale'
        ) {
          setSidebardata({ ...sidebardata, type: e.target.id });
        }
    
        if (e.target.id === 'searchTerm') {
          setSidebardata({ ...sidebardata, searchTerm: e.target.value });
        }
    
        if (
          e.target.id === 'parking' ||
          e.target.id === 'furnished' ||
          e.target.id === 'offer'
        ) {
          setSidebardata({
            ...sidebardata,
            [e.target.id]:
              e.target.checked || e.target.checked === 'true' ? true : false,
          });
        }
    
        if (e.target.id === 'sort_order') {
          const sort = e.target.value.split('_')[0] || 'created_at';
    
          const order = e.target.value.split('_')[1] || 'desc';
    
          setSidebardata({ ...sidebardata, sort, order });
        }
      };
  
    const handleSubmit = (e) => {
      e.preventDefault();
        const urlParams=new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };
  
    const onShowMoreClick = async () => {
      
    };
    return (
      <div className='flex flex-col md:flex-row'>
        <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className='flex items-center gap-2'>
              <label className='whitespace-nowrap font-semibold'>
                Search Term:
              </label>
              <input
                type='text'
                id='searchTerm'
                placeholder='Search...'
                className='border rounded-lg p-3 w-full'
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
              <label className='font-semibold'>Type:</label>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='all'
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebardata.type === 'all'}
                />
                <span>Rent & Sale</span>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='rent'
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebardata.type === 'rent'}
                />
                <span>Rent</span>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='sale'
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebardata.type === 'sale'}
                />
                <span>Sale</span>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='offer'
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebardata.offer}
                />
                <span>Offer</span>
              </div>
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
              <label className='font-semibold'>Amenities:</label>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='parking'
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebardata.parking}
                />
                <span>Parking</span>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='furnished'
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebardata.furnished}
                />
                <span>Furnished</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <label className='font-semibold'>Sort:</label>
              <select
                onChange={handleChange}
                defaultValue={'created_at_desc'}
                id='sort_order'
                className='border rounded-lg p-3'
                style={{ width: '50%' }}

              >
                <option value='regularPrice_desc'>Price high to low</option>
                <option value='regularPrice_asc'>Price low to high</option>
                <option value='createdAt_desc'>Latest</option>
                <option value='createdAt_asc'>Oldest</option>
              </select>
            </div>
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
              Search
            </button>
          </form>
        </div>
        <div className='flex-1'>
          <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
            Listing results:
          </h1>
          <div className='p-7 flex flex-wrap gap-4'>
            {!loading && listings.length === 0 && (
              <p className='text-xl text-slate-700'>No listing found!</p>
            )}
            {loading && (
              <Spinner/>
            )}
  
            <div className="max-w-6xl px-3 mt-6 mx-auto">
                {!loading && listings.length > 0 && (
                <>
                    <h2 className="text-2xl text-center font-semibold mb-6">
                    My Listings
                    </h2>
                    <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {listings.map((listing) => (
                        <ListingItem
                        key={listing.id}
                        id={listing.id}
                        listing={listing.data}                  
                        />
                    ))}
                    </ul>
                </>
                )}
            </div>
    
            {showMore && (
              <button
                onClick={onShowMoreClick}
                className='text-green-700 hover:underline p-7 text-center w-full'
              >
                Show more
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
