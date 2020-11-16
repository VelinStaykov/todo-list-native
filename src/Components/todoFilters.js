import React from 'react'
import { StatusFilters } from '../Core/Store/filtersReducer'
import { FILTERCHANGE } from '../Core/Store/actions';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Footer, FooterTab, Text } from 'native-base';

const TodoFilters = (props) => {

    const dispatch = useDispatch();

    const StatusFilter = ({ value: status, onChange }) => {
        const renderedFilters = Object.keys(StatusFilters).map((key) => {
            const value = StatusFilters[key]
            const handleClick = () => onChange(value)
            const className = value === status ? 'selected' : ''

            return (
                <FooterTab>
                    <Button bordered onPress={handleClick}>
                        <Text style={{color: "black"}}>{key}</Text>
                    </Button>
                </FooterTab>
            )
        })

        return (
            <Footer>
                    {renderedFilters}
            </Footer>
        )
    }

    const { status } = useSelector((state) => state.filters)

    const onStatusChange = (status) => {
        dispatch({ type: FILTERCHANGE, payload: status }) 
    }

    return (
            <StatusFilter value={status} onChange={onStatusChange} />
    )
}

export default TodoFilters