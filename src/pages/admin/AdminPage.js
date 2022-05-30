import React from 'react'
import { AdminHome } from '../../component/admin/AdmiHome/AdminHome'
import { AdminNav } from '../../component/admin/AdminNav/AdminNav'

export const AdminPage = () => {
    return (
        <div>
            <AdminNav />
            <AdminHome />
        </div>
    )
}
