import { CookieOptions, Request, Response } from "express";
import { deburr } from "lodash";

import { ErrorMessage } from "../config/constants.config";
import * as key from "../config/keys";
import logger from "../utils/logger";
