#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { ItsAChatStack } from '../lib/its-a-chat-stack';

const app = new cdk.App();
new ItsAChatStack(app, 'ItsAChatStack');
