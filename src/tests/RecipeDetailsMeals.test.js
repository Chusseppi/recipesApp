import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import corbaMock from './CorbaMock';

const emailInputStr = 'email-input';
const passInputStr = 'password-input';
const loginSbmt = 'login-submit-btn';
const emailEx = 'jose@gmail.com';

describe('Testando o componente RecipeDetails', () => {
  it('1 - Testa se carrega os elementos da receita "Corba" na página', async () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailInputStr);
    const passInput = screen.getByTestId(passInputStr);
    const buttonInput = screen.getByTestId(loginSbmt);
    userEvent.type(emailInput, emailEx);
    userEvent.type(passInput, '1234567');
    userEvent.click(buttonInput);

    act(() => {
      history.push('/meals/52977');
    });
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(corbaMock),
    });

    await waitFor(() => {
      const photo = screen.getByTestId('recipe-photo');
      expect(photo).toBeInTheDocument();
    });

    const title = screen.getByTestId('recipe-title');
    expect(title).toHaveTextContent('Corba');

    const category = screen.getByTestId('recipe-category');
    expect(category).toHaveTextContent('Side');

    await waitFor(() => {
      const firstRecomendationCard = screen.getByTestId('0-recommendation-card');
      expect(firstRecomendationCard).toBeInTheDocument();
    });

    for (let index = 0; index < 13; index += 1) {
      const ingredients = screen.getByTestId(`${index}-ingredient-name-and-measure`);
      expect(ingredients).toBeInTheDocument();
    }

    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startRecipeBtn);
    expect(history.location.pathname).toBe('/meals/52977/in-progress');
  });
});
