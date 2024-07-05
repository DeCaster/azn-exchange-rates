import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ConverterContainer = styled.div`
    margin-top: 20px;
    background-color: white;
    padding: 20px;
    border-radius: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin-top: 240px;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    color: #333;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

const AmountInput = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: calc(100% - 22px);
    margin-bottom: 20px;
`;

const CurrencyInput = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: calc(100% - 22px);
    margin-bottom: 20px;
`;

const ConvertButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: #4caf50;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-bottom: 20px;

    &:hover {
        background-color: #45a049;
    }
`;

const ConvertedAmount = styled.p`
    margin-top: 20px;
    font-size: 18px;
    color: #333;
`;

const ErrorMessage = styled.p`
    color: red;
`;

function CurrencyConverter() {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [error, setError] = useState(null);

    const convertCurrency = async () => {
        try {
            const response = await axios.get(`/api/rates/${fromCurrency}`);
            const fromRate = response.data.rate;
            const toResponse = await axios.get(`/api/rates/${toCurrency}`);
            const toRate = toResponse.data.rate;

            if (fromRate && toRate) {
                const result = (amount / fromRate) * toRate;
                setConvertedAmount(result.toFixed(2));
            } else {
                setError('Rates not found for the given currencies');
            }
        } catch (error) {
            console.error('Error converting currency:', error);
            setError('Error converting currency');
        }
    };

    return (
        <ConverterContainer>
            <Title>Currency Converter</Title>
            <InputContainer>
                <AmountInput
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />
                <CurrencyInput
                    type="text"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value.toUpperCase())}
                    placeholder="From currency (e.g., USD)"
                />
                <CurrencyInput
                    type="text"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value.toUpperCase())}
                    placeholder="To currency (e.g., EUR)"
                />
                <ConvertButton onClick={convertCurrency}>Convert</ConvertButton>
            </InputContainer>
            {convertedAmount && (
                <ConvertedAmount>
                    {amount} {fromCurrency} = {convertedAmount} {toCurrency}
                </ConvertedAmount>
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </ConverterContainer>
    );
}

export default CurrencyConverter;
