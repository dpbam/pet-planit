import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS, QUERY_ME_BASIC } from '../utils/queries';
import PawFeedList from '../components/PawFeedList';
import PawFeedForm from '../components/PawFeedForm';
import Auth from '../utils/auth';