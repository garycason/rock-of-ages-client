import { useState, useCallback } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Authorized } from './Authorized'
import { Login } from '../pages/Login.jsx'
import Home from '../pages/Home'
import { RockForm } from './RockForm.jsx'
import { RockList } from './RockList.jsx'
import { Register } from '../pages/Register.jsx'

export const ApplicationViews = () => {
    const [rocksState, setRocksState] = useState([])

    const fetchRocksFromAPI = useCallback(async () => {
        try {
            const token = JSON.parse(localStorage.getItem("rock_token"))?.token
            if (!token) {
                console.error('Token not found, redirecting to login')
                return
            }
            const response = await fetch("http://localhost:8000/rocks", {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            const rocks = await response.json()
            setRocksState(rocks)
        } catch (error) {
            console.error('Error fetching rocks:', error)
        }
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<Authorized />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/rocks" element={<RockList rocks={rocksState} fetchRocks={fetchRocksFromAPI} />} />
                    <Route path="/create" element={<RockForm fetchRocks={fetchRocksFromAPI} />} />
                    <Route path="/mine" element={<RockList rocks={rocksState} fetchRocks={fetchRocksFromAPI} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
