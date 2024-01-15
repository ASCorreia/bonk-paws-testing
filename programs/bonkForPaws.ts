export type BonkForPaws = {
  "version": "0.1.0",
  "name": "bonk_paws",
  "instructions": [
    {
      "name": "donate",
      "accounts": [
        {
          "name": "donor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "charity",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bonk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "donorBonk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authorityBonk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "donorWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "donationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bonkAmountIn",
          "type": "u64"
        },
        {
          "name": "minLamportsOut",
          "type": "u64"
        }
      ]
    },
    {
      "name": "donateSol",
      "accounts": [
        {
          "name": "donor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "charity",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "donationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "matchDonationState",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "seeds",
          "type": "u64"
        },
        {
          "name": "solDonation",
          "type": "u64"
        },
        {
          "name": "id",
          "type": "u64"
        }
      ]
    },
    {
      "name": "matchSol",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "charity",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bonk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authorityBonk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorityWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "donationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "matchDonationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "seeds",
          "type": "u64"
        },
        {
          "name": "bonkDonation",
          "type": "u64"
        }
      ]
    },
    {
      "name": "finalize",
      "accounts": [
        {
          "name": "donor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "charity",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "donorWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "DonationState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bonkBurned",
            "type": "u128"
          },
          {
            "name": "bonkDonated",
            "type": "u128"
          },
          {
            "name": "bonkMatched",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "MatchDonation",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "SharedAccountsRoute",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u8"
          },
          {
            "name": "routePlan",
            "type": {
              "vec": {
                "defined": "RoutePlanStep"
              }
            }
          },
          {
            "name": "inAmount",
            "type": "u64"
          },
          {
            "name": "quotedOutAmount",
            "type": "u64"
          },
          {
            "name": "slippageBps",
            "type": "u16"
          },
          {
            "name": "platformFeeBps",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "RoutePlanStep",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "swap",
            "type": {
              "defined": "Swap"
            }
          },
          {
            "name": "percent",
            "type": "u8"
          },
          {
            "name": "inputIndex",
            "type": "u8"
          },
          {
            "name": "outputIndex",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "Side",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Bid"
          },
          {
            "name": "Ask"
          }
        ]
      }
    },
    {
      "name": "Swap",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Saber"
          },
          {
            "name": "SaberAddDecimalsDeposit"
          },
          {
            "name": "SaberAddDecimalsWithdraw"
          },
          {
            "name": "TokenSwap"
          },
          {
            "name": "Sencha"
          },
          {
            "name": "Step"
          },
          {
            "name": "Cropper"
          },
          {
            "name": "Raydium"
          },
          {
            "name": "Crema",
            "fields": [
              {
                "name": "xToY",
                "type": "bool"
              }
            ]
          },
          {
            "name": "Lifinity"
          },
          {
            "name": "Mercurial"
          },
          {
            "name": "Cykura"
          },
          {
            "name": "Serum",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": "Side"
                }
              }
            ]
          },
          {
            "name": "MarinadeDeposit"
          },
          {
            "name": "MarinadeUnstake"
          },
          {
            "name": "Aldrin",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": "Side"
                }
              }
            ]
          },
          {
            "name": "AldrinV2",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": "Side"
                }
              }
            ]
          },
          {
            "name": "Whirlpool",
            "fields": [
              {
                "name": "aToB",
                "type": "bool"
              }
            ]
          },
          {
            "name": "Invariant",
            "fields": [
              {
                "name": "xToY",
                "type": "bool"
              }
            ]
          },
          {
            "name": "Meteora"
          },
          {
            "name": "GooseFX"
          },
          {
            "name": "DeltaFi",
            "fields": [
              {
                "name": "stable",
                "type": "bool"
              }
            ]
          },
          {
            "name": "Balansol"
          },
          {
            "name": "MarcoPolo",
            "fields": [
              {
                "name": "xToY",
                "type": "bool"
              }
            ]
          },
          {
            "name": "Dradex",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": "Side"
                }
              }
            ]
          },
          {
            "name": "LifinityV2"
          },
          {
            "name": "RaydiumClmm"
          },
          {
            "name": "Openbook",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": "Side"
                }
              }
            ]
          },
          {
            "name": "Phoenix",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": "Side"
                }
              }
            ]
          },
          {
            "name": "Symmetry",
            "fields": [
              {
                "name": "fromTokenId",
                "type": "u64"
              },
              {
                "name": "toTokenId",
                "type": "u64"
              }
            ]
          },
          {
            "name": "TokenSwapV2"
          },
          {
            "name": "HeliumTreasuryManagementRedeemV0"
          },
          {
            "name": "StakeDexStakeWrappedSol"
          },
          {
            "name": "StakeDexSwapViaStake",
            "fields": [
              {
                "name": "bridgeStakeSeed",
                "type": "u32"
              }
            ]
          },
          {
            "name": "GooseFXV2"
          },
          {
            "name": "Perps"
          },
          {
            "name": "PerpsAddLiquidity"
          },
          {
            "name": "PerpsRemoveLiquidity"
          },
          {
            "name": "MeteoraDlmm"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAmount",
      "msg": "Invalid amount"
    },
    {
      "code": 6001,
      "name": "MissingSwapIx",
      "msg": "Swap IX not found"
    },
    {
      "code": 6002,
      "name": "MissingFinalizeIx",
      "msg": "Finalize IX not found"
    },
    {
      "code": 6003,
      "name": "MissingDonateIx",
      "msg": "Donate IX not found"
    },
    {
      "code": 6004,
      "name": "ProgramMismatch",
      "msg": "Invalid Program ID"
    },
    {
      "code": 6005,
      "name": "InvalidInstruction",
      "msg": "Invalid instruction"
    },
    {
      "code": 6006,
      "name": "InvalidRoute",
      "msg": "Invalid number of routes"
    },
    {
      "code": 6007,
      "name": "InvalidSlippage",
      "msg": "Invalid slippage"
    },
    {
      "code": 6008,
      "name": "InvalidSolanaAmount",
      "msg": "Invalid Solana amount"
    },
    {
      "code": 6009,
      "name": "InvalidBonkMint",
      "msg": "Invalid BONK mint address"
    },
    {
      "code": 6010,
      "name": "InvalidBonkAccount",
      "msg": "Invalid BONK account"
    },
    {
      "code": 6011,
      "name": "InvalidBonkATA",
      "msg": "Invalid BONK ATA"
    },
    {
      "code": 6012,
      "name": "InvalidwSolMint",
      "msg": "Invalid wSOL mint address"
    },
    {
      "code": 6013,
      "name": "InvalidwSolATA",
      "msg": "Invalid wSOL ATA"
    },
    {
      "code": 6014,
      "name": "InvalidwSolAccount",
      "msg": "Invalid wSOL account"
    },
    {
      "code": 6015,
      "name": "InvalidwSolBalance",
      "msg": "Invalid wSOL balance"
    },
    {
      "code": 6016,
      "name": "InvalidCharityAddress",
      "msg": "Invalid charity address"
    },
    {
      "code": 6017,
      "name": "InvalidLamportsBalance",
      "msg": "Invalid lamports balance"
    },
    {
      "code": 6018,
      "name": "InvalidInstructionIndex",
      "msg": "Invalid instruction index"
    },
    {
      "code": 6019,
      "name": "SignatureHeaderMismatch",
      "msg": "Signature header mismatch"
    },
    {
      "code": 6020,
      "name": "SignatureAuthorityMismatch",
      "msg": "Signature authority mismatch"
    },
    {
      "code": 6021,
      "name": "NotMatchingDonation",
      "msg": "Not enough SOL Donated to Match"
    }
  ]
}

export const IDL: BonkForPaws = {
  "version": "0.1.0",
  "name": "bonk_paws",
  "instructions": [
    {
      "name": "donate",
      "accounts": [
        {
          "name": "donor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "charity",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bonk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "donorBonk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authorityBonk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "donorWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "donationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bonkAmountIn",
          "type": "u64"
        },
        {
          "name": "minLamportsOut",
          "type": "u64"
        }
      ]
    },
    {
      "name": "donateSol",
      "accounts": [
        {
          "name": "donor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "charity",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "donationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "matchDonationState",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "seeds",
          "type": "u64"
        },
        {
          "name": "solDonation",
          "type": "u64"
        },
        {
          "name": "id",
          "type": "u64"
        }
      ]
    },
    {
      "name": "matchSol",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "charity",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bonk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authorityBonk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authorityWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "donationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "matchDonationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "seeds",
          "type": "u64"
        },
        {
          "name": "bonkDonation",
          "type": "u64"
        }
      ]
    },
    {
      "name": "finalize",
      "accounts": [
        {
          "name": "donor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "charity",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wsol",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "donorWsol",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "DonationState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bonkBurned",
            "type": "u128"
          },
          {
            "name": "bonkDonated",
            "type": "u128"
          },
          {
            "name": "bonkMatched",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "MatchDonation",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "SharedAccountsRoute",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u8"
          },
          {
            "name": "routePlan",
            "type": {
              "vec": {
                "defined": "RoutePlanStep"
              }
            }
          },
          {
            "name": "inAmount",
            "type": "u64"
          },
          {
            "name": "quotedOutAmount",
            "type": "u64"
          },
          {
            "name": "slippageBps",
            "type": "u16"
          },
          {
            "name": "platformFeeBps",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "RoutePlanStep",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "swap",
            "type": {
              "defined": "Swap"
            }
          },
          {
            "name": "percent",
            "type": "u8"
          },
          {
            "name": "inputIndex",
            "type": "u8"
          },
          {
            "name": "outputIndex",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "Side",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Bid"
          },
          {
            "name": "Ask"
          }
        ]
      }
    },
    {
      "name": "Swap",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Saber"
          },
          {
            "name": "SaberAddDecimalsDeposit"
          },
          {
            "name": "SaberAddDecimalsWithdraw"
          },
          {
            "name": "TokenSwap"
          },
          {
            "name": "Sencha"
          },
          {
            "name": "Step"
          },
          {
            "name": "Cropper"
          },
          {
            "name": "Raydium"
          },
          {
            "name": "Crema",
            "fields": [
              {
                "name": "xToY",
                "type": "bool"
              }
            ]
          },
          {
            "name": "Lifinity"
          },
          {
            "name": "Mercurial"
          },
          {
            "name": "Cykura"
          },
          {
            "name": "Serum",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": "Side"
                }
              }
            ]
          },
          {
            "name": "MarinadeDeposit"
          },
          {
            "name": "MarinadeUnstake"
          },
          {
            "name": "Aldrin",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": "Side"
                }
              }
            ]
          },
          {
            "name": "AldrinV2",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": "Side"
                }
              }
            ]
          },
          {
            "name": "Whirlpool",
            "fields": [
              {
                "name": "aToB",
                "type": "bool"
              }
            ]
          },
          {
            "name": "Invariant",
            "fields": [
              {
                "name": "xToY",
                "type": "bool"
              }
            ]
          },
          {
            "name": "Meteora"
          },
          {
            "name": "GooseFX"
          },
          {
            "name": "DeltaFi",
            "fields": [
              {
                "name": "stable",
                "type": "bool"
              }
            ]
          },
          {
            "name": "Balansol"
          },
          {
            "name": "MarcoPolo",
            "fields": [
              {
                "name": "xToY",
                "type": "bool"
              }
            ]
          },
          {
            "name": "Dradex",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": "Side"
                }
              }
            ]
          },
          {
            "name": "LifinityV2"
          },
          {
            "name": "RaydiumClmm"
          },
          {
            "name": "Openbook",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": "Side"
                }
              }
            ]
          },
          {
            "name": "Phoenix",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": "Side"
                }
              }
            ]
          },
          {
            "name": "Symmetry",
            "fields": [
              {
                "name": "fromTokenId",
                "type": "u64"
              },
              {
                "name": "toTokenId",
                "type": "u64"
              }
            ]
          },
          {
            "name": "TokenSwapV2"
          },
          {
            "name": "HeliumTreasuryManagementRedeemV0"
          },
          {
            "name": "StakeDexStakeWrappedSol"
          },
          {
            "name": "StakeDexSwapViaStake",
            "fields": [
              {
                "name": "bridgeStakeSeed",
                "type": "u32"
              }
            ]
          },
          {
            "name": "GooseFXV2"
          },
          {
            "name": "Perps"
          },
          {
            "name": "PerpsAddLiquidity"
          },
          {
            "name": "PerpsRemoveLiquidity"
          },
          {
            "name": "MeteoraDlmm"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAmount",
      "msg": "Invalid amount"
    },
    {
      "code": 6001,
      "name": "MissingSwapIx",
      "msg": "Swap IX not found"
    },
    {
      "code": 6002,
      "name": "MissingFinalizeIx",
      "msg": "Finalize IX not found"
    },
    {
      "code": 6003,
      "name": "MissingDonateIx",
      "msg": "Donate IX not found"
    },
    {
      "code": 6004,
      "name": "ProgramMismatch",
      "msg": "Invalid Program ID"
    },
    {
      "code": 6005,
      "name": "InvalidInstruction",
      "msg": "Invalid instruction"
    },
    {
      "code": 6006,
      "name": "InvalidRoute",
      "msg": "Invalid number of routes"
    },
    {
      "code": 6007,
      "name": "InvalidSlippage",
      "msg": "Invalid slippage"
    },
    {
      "code": 6008,
      "name": "InvalidSolanaAmount",
      "msg": "Invalid Solana amount"
    },
    {
      "code": 6009,
      "name": "InvalidBonkMint",
      "msg": "Invalid BONK mint address"
    },
    {
      "code": 6010,
      "name": "InvalidBonkAccount",
      "msg": "Invalid BONK account"
    },
    {
      "code": 6011,
      "name": "InvalidBonkATA",
      "msg": "Invalid BONK ATA"
    },
    {
      "code": 6012,
      "name": "InvalidwSolMint",
      "msg": "Invalid wSOL mint address"
    },
    {
      "code": 6013,
      "name": "InvalidwSolATA",
      "msg": "Invalid wSOL ATA"
    },
    {
      "code": 6014,
      "name": "InvalidwSolAccount",
      "msg": "Invalid wSOL account"
    },
    {
      "code": 6015,
      "name": "InvalidwSolBalance",
      "msg": "Invalid wSOL balance"
    },
    {
      "code": 6016,
      "name": "InvalidCharityAddress",
      "msg": "Invalid charity address"
    },
    {
      "code": 6017,
      "name": "InvalidLamportsBalance",
      "msg": "Invalid lamports balance"
    },
    {
      "code": 6018,
      "name": "InvalidInstructionIndex",
      "msg": "Invalid instruction index"
    },
    {
      "code": 6019,
      "name": "SignatureHeaderMismatch",
      "msg": "Signature header mismatch"
    },
    {
      "code": 6020,
      "name": "SignatureAuthorityMismatch",
      "msg": "Signature authority mismatch"
    },
    {
      "code": 6021,
      "name": "NotMatchingDonation",
      "msg": "Not enough SOL Donated to Match"
    }
  ]
}