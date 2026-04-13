from enum import Enum

class OpportunityStatus(str, Enum):
    LEAD = "LEAD"
    CONTACTED = "CONTACTED"
    PROPOSAL = "PROPOSAL"
    WON = "WON"
    LOST = "LOST"