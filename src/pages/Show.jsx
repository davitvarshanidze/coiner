import React from 'react'
import show_store from '../stores/show_store'
import { useParams } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '../components/Header';

export default function Show() {
    const store = show_store()
    const params = useParams()

    React.useEffect(() => {
        store.fetch_data(params.id)
        return () => {
            store.reset();
        }
    }, []);

    if (!store.data) return <></>; 

    return (
        <div>
            <Header back />
        {store.data && (<>
            <header className='show_header'>
                <img src={store.data.image.large} alt='store_image'/> 
                <h2>
                    {store.data.name} ({store.data.symbol})
                </h2>
            </header>
            <div className="width">
                <div className="show_graph">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={store.graph_data}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Date" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="show_details">
                <div className="width">
                    <h2>Details</h2>
                        <div className='show_details_row'>
                            <h3>Market cap rank</h3>
                            <span>${store.data.market_cap_rank}</span>
                        </div>
                        <div className='show_details_row'>
                            <h3>24h High</h3>
                            <span>${store.data.market_data.high_24h.usd}</span>
                        </div>
                        <div className='show_details_row'>
                            <h3>24h Low</h3>
                            <span>${store.data.market_data.low_24h.usd}</span>
                        </div>
                        <div className='show_details_row'>
                            <h3>Circulating supply</h3>
                            <span>${store.data.market_data.circulating_supply}</span>
                        </div>
                        <div className='show_details_row'>
                            <h3>Current price</h3>
                            <span>${store.data.market_data.current_price.usd}</span>
                        </div>
                        <div className='show_details_row'>
                            <h3>1 Year change</h3>
                            <span>${store.data.market_data.price_change_percentage_1y.toFixed(2)}%</span>
                        </div> 
                </div>
            </div>
        </>)}
        </div>
    );
}
