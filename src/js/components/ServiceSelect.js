import React, { useState } from 'react';
import reduce from 'lodash/reduce';
import Select from 'react-select';
import map from 'lodash/map'

function ServiceSelect(props){
    const { editMode, submitting, services, value } = props;

    const extractServiceSelectOptionsListFromServices = (services) => {
        return reduce(services,(list,service) => {
            list.push({value: service.ID, label: service.ServiceName})
            return list;
        },[]);
    }

    const options = extractServiceSelectOptionsListFromServices(services);
    

    const getCurrentValue = value => {
        const currentValueServiceIds = JSON.parse(value);

        return options.filter((option) => {
            return currentValueServiceIds.includes(option.value);
        });
    }

    let currentValue = value ? getCurrentValue(value) : [];

    const [selectValue, setSelectValue] = useState(currentValue);

    const handleChange = selectedOptions => {
        setSelectValue(selectedOptions);
    }

    return (
        <>
            {!editMode || submitting ? 
                map(selectValue,(option) => {
                    return (<>
                        <span className='fake-input'>{option.label}</span><br/>
                    </>);
                })
            :
            <Select 
                options={extractServiceSelectOptionsListFromServices(services)}
                isMulti={true}
                name={'ServiceIDs'}
                value={selectValue}
                onChange={handleChange}
            />}
        </>
    )
}

export default ServiceSelect;