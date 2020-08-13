import React from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PoForActionSection from './PoForActionSection';
import { getDepartmentCharateristics } from '../functions/departmentFunctions';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import forEach from 'lodash/forEach';

function ForActionTable(props) {
    let { product, department, tree } = props;
    const { contacts, pos, prepayments } = department;
    
    forEach(prepayments, (prepayment) => {
        prepayments[prepayment.ID].Remaining = prepayment.Amount;
    })

    const usage = getDepartmentCharateristics(department,'usage').filter((usageItem) => {
        return !usageItem.InvoiceID && usageItem.totalcost > 0;
    }).map((usageItem) => {
        usageItem.StartDate = new Date(usageItem.StartDate);
        usageItem.EndDate = new Date(usageItem.EndDate);
        usageItem.displayAmount = usageItem.totalcost;
        return usageItem;
    }).sort((a,b) => {
        const aTime = a.StartDate.getTime()
        const bTime = b.StartDate.getTime()
        return aTime === bTime ? 0 : aTime > bTime ? 1 : -1;
    }).filter((usageItem) => {
        var prepaid = false;
        var usageItemStart = new Date(usageItem.StartDate);
        var usageItemEnd = new Date(usageItem.EndDate);
        
        forEach(prepayments, (prepayment) => {

            const serviceIdList = prepayment.ServiceIDs ? JSON.parse(prepayment.ServiceIDs) : [];
            const prepaymentStart = new Date(prepayment.StartDate);
            const prepaymentEnd = new Date(prepayment.EndDate);
            
            if(!prepaid && prepayments[prepayment.ID].Remaining > 0 && serviceIdList.includes(usageItem.service_id) && usageItemStart >= prepaymentStart && usageItemEnd <= prepaymentEnd){
                
                if(prepayments[prepayment.ID].Remaining > usageItem.totalcost){
                    prepayments[prepayment.ID].Remaining -= usageItem.totalcost;
                    prepaid = true;
                } else {
                    usageItem.displayAmount -= prepayments[prepayment.ID].Remaining
                    prepayments[prepayment.ID].Remaining = 0;
                }
            }
        });

        return !prepaid;
    });



    const createPoGroups = (pos,usage) => {
        return reduce(pos,(total,po) => {
            const serviceIdList = po.ServiceIDs ? JSON.parse(po.ServiceIDs) : [];
            total = reduce(serviceIdList,(subTotal,serviceId) => {
                if(!subTotal[serviceId]){
                    subTotal[serviceId] = {pos: [], usage: [], posJoin: ''}
                }
                subTotal[serviceId].pos.push(po.ID)
                subTotal[serviceId].posJoin = subTotal[serviceId].pos.sort().join();
                return subTotal;
            },total);
            return total;
        },{});
    }

    const createServicesWithSamePoObject = (poGroups) => {
        return reduce(poGroups,(object,poGroup,serviceId) => {
            if(!object[poGroup.posJoin]){
                object[poGroup.posJoin] = {pos: {}, usage: [], services: []};
            }
            object[poGroup.posJoin].services.push(serviceId);
            return object;
        },{})
    }

    const createDisplayGroups = (usage, poGroups, servicesWithSamePos) => {
        servicesWithSamePos.noPo = {pos: {}, usage: [], services: []};
        return reduce(usage,(object,usageItem) => {
            if(poGroups[usageItem.service_id]) {
                object[poGroups[usageItem.service_id].posJoin].usage.push(usageItem);

                map(poGroups[usageItem.service_id].pos,(poId) => {
                    object[poGroups[usageItem.service_id].posJoin].pos[poId] = pos[poId];
                });
            } else {
                object.noPo.usage.push(usageItem);
            }
            
            return object;
        },servicesWithSamePos);
    }

    const poGroups = createPoGroups(pos,usage);
    
    const servicesWithSamePos = createServicesWithSamePoObject(poGroups)
    const displayGroups = createDisplayGroups(usage,poGroups,servicesWithSamePos);

    return (
        <>
            {usage.length > 0 ? 
                <Row>
                    <Col>
                        <Alert variant='danger'>
                            <Container>
                                <Row>
                                    <Col className='text-center'>
                                        <h4>For Action</h4>
                                    </Col>
                                </Row>
                                {map(displayGroups,displayGroup => {
                                    return (
                                        <PoForActionSection 
                                            product={product}
                                            department={department}
                                            tree={tree}
                                            contacts={contacts}
                                            pos={displayGroup.pos}
                                            usage={displayGroup.usage}
                                        />
                                    )
                                })}
                            </Container>
                        </Alert>
                    </Col>
                </Row> 
            : ''}
        </>
    )
}

export default ForActionTable;