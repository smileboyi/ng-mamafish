import { InjectionToken } from "@angular/core";

import { FdEleMeta } from "@declare";

export const LAYOUT_CONFIG = new InjectionToken<string>("layoutConfig");
export const PROFILE_INFO = new InjectionToken<string>("profileInfo");
export const MUSIC_INFO = new InjectionToken<string>("musicInfo");
export const PAGE_TABS_DATA = new InjectionToken<string>("pageTabsData");
export const FD_ELE_META = new InjectionToken<FdEleMeta>("fdEleMeta");
