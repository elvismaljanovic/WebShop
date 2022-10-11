import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { listProductsSearch } from '../action/productsave';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    sizeSet:{
      width: '7vh',
      height: '5vh'
    }
  },
}));

export default function PaginationControlled() {
  const paginationPage = useSelector(state=>state.paginationControl)
  const {totalPage} = paginationPage
  const classes = useStyles()
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch()
  const handleChange = (event, page) => {
    dispatch(listProductsSearch('','','',page))
    setPage(page);
  };

  return (
    <div className={classes.sizeSet}>
      <Typography>Page: {page}</Typography>
      <Pagination count={totalPage} page={page} onChange={handleChange} />
    </div>
  );
}
