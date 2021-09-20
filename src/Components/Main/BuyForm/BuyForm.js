import React from 'react'
import { InputGroup,FormControl,Button} from 'react-bootstrap';
export default function BuyForm() {
    return (
        <div>
             <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <InputGroup.Text>0.00</InputGroup.Text>
                <FormControl aria-label="Dollar amount (with dot and two decimal places)" />
                <Button variant="outline-secondary" id="button-addon2">
                    Buy
                </Button>
            </InputGroup>
        </div>
    )
}
