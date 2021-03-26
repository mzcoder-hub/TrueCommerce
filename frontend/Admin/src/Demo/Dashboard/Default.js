import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Row} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import RecentOrders from '../../Components/Compo/RecentOrdersPaid';
import RecentOrdersNotPaid from '../../Components/Compo/RecentOrdersNotPaid';
import HomeStatic from '../../Components/Compo/HomeStatic';
import AdditionalInfo from '../../Components/Compo/AdditionalInfo';


const Default = ({history}) => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            history.push('/auth/signin')
        }
    }, [dispatch, history, userInfo])


    return (
                    <Aux>
                        <Row>
                            <HomeStatic />
                            <RecentOrders />
                            <AdditionalInfo />
                            <RecentOrdersNotPaid />
                        </Row>
                    </Aux>
    )
}

export default Default
