import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { middleWare } from './redux/modules/movie';
import styled from 'styled-components';

const Main = () => {
  const dispatch = useDispatch();
  const BASE_URL = 'https://image.tmdb.org/t/p/original/';

  const popularMovie = useSelector((state) => state.movie.popularList);
  const topRankMoive = useSelector((state) => state.movie.topRankList);

  const [poupularToggle, setPoupularToggle] = useState('');
  const [rankToggle, setRankToggle] = useState('');

  const getPopularMovie = () => {
    dispatch(middleWare.getPopularMovieToAxios());
    setPoupularToggle(true);
    setRankToggle(false);
  };
  const getTopRankMovie = () => {
    dispatch(middleWare.getTopRankMovieToAxios());
    setRankToggle(true);
    setPoupularToggle(false);
  };

  return (
    <>
      <Container>
        <Title>영화데이터</Title>
        <Box>
          <Button onClick={getPopularMovie} margin='0 15px 0 0'>
            유명 영화 데이터
          </Button>
          <Button onClick={getTopRankMovie}>영화 랭킹 데이터</Button>
        </Box>
      </Container>

      {poupularToggle ? (
        <MovieListContiner>
          {popularMovie.map((content) => {
            return (
              <MovieListBox key={content.id}>
                <Img src={`${BASE_URL}${content.poster_path}`} />
                <TextBox>
                  <P>제목 : {content.title}</P>
                  <P>개봉일 : {content.release_date}</P>
                  <P>평점 : {content.vote_average} </P>
                  <P margin='0 0 10px 0'>개요</P>
                  <P margin='0 0 30px 0'>{content.overview}</P>
                </TextBox>
              </MovieListBox>
            );
          })}
        </MovieListContiner>
      ) : (
        ''
      )}

      {rankToggle ? (
        <MovieListContiner>
          {topRankMoive.map((content) => {
            return (
              <MovieListBox key={content.id}>
                <Img src={`${BASE_URL}${content.poster_path}`} />
                <TextBox>
                  <P>제목 : {content.title}</P>
                  <P>개봉일 : {content.release_date}</P>
                  <P>평점 : {content.vote_average} </P>
                  <P margin='0 0 10px 0'>개요</P>
                  <P margin='0 0 30px 0'>{content.overview}</P>
                </TextBox>
              </MovieListBox>
            );
          })}
        </MovieListContiner>
      ) : (
        ''
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 40px;
`;

const Box = styled.div`
  display: flex;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 100px;
  border: 1px solid black;
  border-radius: 5px;
  margin: ${(props) => props.margin};
  cursor: pointer;
  font-weight: bold;
`;

const MovieListContiner = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 10px;
  padding: 0 60px;
`;

const MovieListBox = styled.div`
  margin: 50px 30px 0 0;
  width: 315px;
  border: 1px solid black;
`;

const TextBox = styled.div`
  padding: 0 15px;
`;

const Img = styled.img`
  width: 315px;
  height: 300px;
  object-fit: center;
`;

const P = styled.p`
  font-weight: bold;
  line-height: 20px;
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export default Main;
