// prisma client import
import { PrismaClient } from "@prisma/client";

// Request, Response import from express
import { Request, Response } from "express";
import jwtDecode from "jwt-decode";

// custom http status codes
import http_status from "../helpers/http_status";

// prisma client
const prisma = new PrismaClient();

// add quotation transaction
export const addQuotationTransaction = async (req: Request, res: Response) => {
  const constructionCompanyId = req.body.constructionCompanyId;
  const opportunityId = req.body.opportunityId;
  const quotationStatus = req.body.quotationStatus;
  const tr3Required = req.body.tr3Required;
  const plantId = req.body.plantId;
  const projectManagerId = req.body.projectManagerId;
  const dueDate = req.body.dueDate;
  const increaseDate = req.body.increaseDate;
  const notes = req.body.notes;
  const status = req.body.status;
  let data = await jwtDecode(JSON.stringify(req.headers.authorization));

  const dataString = JSON.stringify(data);

  const salesPersonId = JSON.parse(dataString).id;

  try {
    const addQT = await prisma.quotation_transaction.create({
      data: {
        constructionCompanyId: constructionCompanyId,
        salesPersonId: salesPersonId,
        opportunityId: opportunityId,
        quotationStatus: quotationStatus,
        tr3Required: tr3Required,
        plantId: plantId,
        projectManagerId: projectManagerId,
        dueDate: dueDate,
        increaseDate: increaseDate,
        notes: notes,
        status: status,
        quotationType: {},
        quotationCode: ""
      },
    });

    let data = await jwtDecode(JSON.stringify(req.headers.authorization));

    const dataString = JSON.stringify(data);

    const id = JSON.parse(dataString).id;

    const userData = await prisma.user.findUnique({ where: { id: id } });

    if (addQT) {
      let obj = [
        { key: "Construction Company Id", value: addQT.constructionCompanyId },
        { key: "opportunityId", value: addQT.opportunityId },
        { key: "quotationStatus", value: addQT.quotationStatus },
        { key: "tr3Required", value: addQT.tr3Required },
        { key: "dueDate", value: addQT.dueDate },
        { key: "increaseDate", value: addQT.increaseDate },
        { key: "notes", value: addQT.notes },
      ];

      if (userData) {
        const qtype = await prisma.quotation_type.create({
          data: {
            Quote_Transaction_Id: addQT.id,
            quoteCode: "QuoteCode-" + addQT.id,
            Quote_Type: "original",
            TypeNumber: 1,
            status: "pending",
          },
        });

        if (qtype) {
          let extraChargesMaster = await prisma.extra_charge.findMany();
          let premiumRatesMaster = await prisma.premium_rates.findMany();
          let overtimeFeeMaster = await prisma.overtime_fees.findMany();
          let shortLoadMaster = await prisma.short_load.findMany();
          const extraChargesDump = extraChargesMaster.map(e => ({ quotationId: qtype.id, ...e }))
          const premiumRatesDump = premiumRatesMaster.map(e => ({ quotationId: qtype.id, ...e }))
          const overtimeFeeDump = overtimeFeeMaster.map(e => ({ quotationId: qtype.id, ...e }))
          const shortLoadDump = shortLoadMaster.map(e => ({ quotationId: qtype.id, ...e }))

          await prisma.quote_extra_charge.createMany({
            data: extraChargesDump
          })

          await prisma.quote_premium_rates.createMany({
            data: premiumRatesDump
          })

          await prisma.quote_overtime_charge.createMany({
            data: overtimeFeeDump
          })

          await prisma.quote_shortload_charge.createMany({
            data: shortLoadDump
          })


          const addAuditLog = await prisma.audit_logs.create({
            data: {
              userName: userData?.firstName,
              email: userData?.username,
              contactNumber: userData?.contactNo,
              updatedField: JSON.stringify(obj),
              operationName: "Quotation generated",
              sectionName: "quotation",
              sectionDataid: addQT.id,
            },
          });
          if (addAuditLog) {
            return res
              .status(http_status.Created)
              .json({ message: "Quotation created", data: null });
          } else {
            return res
              .status(http_status.Bad_Request)
              .json({ message: "Something went wrong in audit logs" });
          }


        }


      }
    } else {
      return res
        .status(http_status.Bad_Request)
        .json({ message: "Something went wrong in adding quotation" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Failed to create quotation generation" });
  }
};

// update quotation transaction
export const updateQuotationTransaction = async (
  req: Request,
  res: Response
) => {
  try {
    const { id, ...requestData } = req.body;
    const updateObject = {};

    for (const [key, value] of Object.entries(requestData)) {
      if (value !== undefined && value !== null) {
        updateObject[key] = value;
      }
    }

    if (Object.keys(updateObject).length === 0) {
      return res.status(http_status.Bad_Request).json({
        status: http_status.Bad_Request,
        message: "No valid fields provided for update.",
      });
    }

    const updatedata = await prisma.quotation_transaction.update({
      where: {
        id: req.body.id,
      },
      data: updateObject,
    });

    if (updatedata) {
      return res.status(http_status.OK).json({ message: "Success" });
    } else {
      return res.status(http_status.Bad_Request).json({ message: "Error" });
    }
  } catch (err) {
    console.log(err)
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Error" });
  }
};

// delete quotation transaction
export const deleteQuotationTransaction = async (
  req: Request,
  res: Response
) => {
  try {
    const updatedata = await prisma.quotation_transaction.delete({
      where: {
        id: req.body.id,
      },
    });

    if (updatedata) {
      const backup = await prisma.quotation_transaction_backup.create({
        data: {
          ...updatedata,
        },
      });

      if (backup) {
        return res.status(http_status.OK).json({ message: "Success" });
      } else {
        return res.status(http_status.Bad_Request).json({ message: "Error" });
      }
    } else {
      return res.status(http_status.Bad_Request).json({ message: "Error" });
    }
  } catch (err) {
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Error" });
  }
};

// get quotation transaction list
export const getQuotationTransactionList = async (
  req: Request,
  res: Response
) => {
  try {
    let list = [];
    const quotation_transaction_list =
      await prisma.quotation_transaction.findMany();

    if (quotation_transaction_list) {
      for (let i = 0; i < quotation_transaction_list.length; i++) {
        const constructionCompanyId =
          quotation_transaction_list[i].constructionCompanyId;
        const opportunityId = quotation_transaction_list[i].opportunityId;
        const projectManagerId = quotation_transaction_list[i].projectManagerId;
        const salesPersonId = quotation_transaction_list[i].salesPersonId;

        console.log(salesPersonId)

        const companyData = await prisma.construction_company.findUnique({
          where: {
            id: constructionCompanyId,
          },
        });

        const opportunityData = await prisma.opportunities.findUnique({
          where: {
            id: opportunityId,
          },
        });

        const projectManagerData = await prisma.project_manager.findUnique({
          where: {
            id: projectManagerId,
          },
        });

        const salesPersonData = await prisma.user.findUnique({
          where: {
            id: salesPersonId,
          },
        });

        const quoteTypeList = await prisma.quotation_type.findFirst({
          where: {
            Quote_Transaction_Id: quotation_transaction_list[i].id,
          },
        });

        const data = quotation_transaction_list[i];

        list.push({
          constructionCompanyId: constructionCompanyId,
          constructionCompanyName: companyData?.construction_company_name,
          opportunityId: opportunityId,
          opportunityName: opportunityData?.lead_name,
          projectManagerId: projectManagerId,
          projectManagerName: projectManagerData?.project_manager_name,
          salesPersonId: salesPersonId,
          salesPersonName: salesPersonData?.firstName,
          plantId: data.plantId,
          id: data.id,
          dueDate: data.dueDate,
          increaseDate: data.increaseDate,
          notes: data.notes,
          quotationStatus: data.quotationStatus,
          status: data.status,
          tr3Required: data.tr3Required,
          quoteTypeList: quoteTypeList,
        });
      }

      return res
        .status(http_status.OK)
        .json({ data: list, message: "Success" });
    } else {
      return res
        .status(http_status.Not_Found)
        .json({ data: null, message: "No Data Found" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(http_status.Bad_Request)
      .json({ message: "Failed to get data" });
  }
};

export const addQuotationType = async (req: Request, res: Response) => {
  const quoteCode = req.body.quoteCode;
  const QuoteType_ID = req.body.QuoteType_ID;
  const Quote_Type = req.body.Quote_Type;
  const Quote_Transaction_Id = req.body.Quote_Transaction_Id;
  const TypeNumber = req.body.TypeNumber;
  const status = req.body.status;

  try {
    const addQType = await prisma.quotation_type.create({
      data: {
        quoteCode,
        Quote_Type,
        Quote_Transaction_Id,
        TypeNumber,
        status,
      },
    });

    let data = await jwtDecode(JSON.stringify(req.headers.authorization));

    const dataString = JSON.stringify(data);

    const id = JSON.parse(dataString).id;

    const userData = await prisma.user.findUnique({ where: { id: id } });

    if (addQType) {
      if (userData) {
        const addAuditLog = await prisma.audit_logs.create({
          data: {
            userName: userData?.firstName,
            email: userData?.username,
            contactNumber: userData?.contactNo,
            updatedField: "",
            operationName: "Quotation Type generated",
            sectionName: "quotation",
            sectionDataid: addQType.id,
          },
        });
        if (addAuditLog) {
          return res
            .status(http_status.Created)
            .json({ message: "Quotation Type created", data: null });
        } else {
          return res
            .status(http_status.Bad_Request)
            .json({ message: "Something went wrong in audit logs" });
        }
      }
    } else {
      return res
        .status(http_status.Bad_Request)
        .json({ message: "Something went wrong in adding quotation type" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Failed to create quotation generation" });
  }
};

export const updateQuotationType = async (req: Request, res: Response) => {
  try {
    const { id, ...requestData } = req.body;
    const updateObject = {};

    for (const [key, value] of Object.entries(requestData)) {
      if (value !== undefined && value !== null) {
        updateObject[key] = value;
      }
    }

    if (Object.keys(updateObject).length === 0) {
      return res.status(http_status.Bad_Request).json({
        status: http_status.Bad_Request,
        message: "No valid fields provided for update.",
      });
    }

    const updatedata = await prisma.quotation_type.update({
      where: {
        id: req.body.id,
      },
      data: updateObject,
    });

    if (updatedata) {
      return res.status(http_status.OK).json({ message: "Success" });
    } else {
      return res.status(http_status.Bad_Request).json({ message: "Error" });
    }
  } catch (err) {
    console.log(err)
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Error" });
  }
};

export const deleteQuotationType = async (req: Request, res: Response) => {
  try {
    const updatedata = await prisma.quotation_type.delete({
      where: {
        id: req.body.id,
      },
    });

    if (updatedata) {
      const backup = await prisma.quotation_type_backup.create({
        data: {
          ...updatedata,
        },
      });

      if (backup) {
        return res.status(http_status.OK).json({ message: "Success" });
      } else {
        return res.status(http_status.Bad_Request).json({ message: "Error" });
      }
    } else {
      return res.status(http_status.Bad_Request).json({ message: "Error" });
    }
  } catch (err) {
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Error" });
  }
};

export const getQuotationTypeList = async (req: Request, res: Response) => {
  try {
    const data = await prisma.quotation_type.findMany();

    if (data) {
      return res
        .status(http_status.OK)
        .json({ data: data, message: "Success" });
    } else {
      return res
        .status(http_status.Not_Found)
        .json({ data: null, message: "No Data Found" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(http_status.Bad_Request)
      .json({ message: "Failed to get data" });
  }
};

export const getPendingQuotations = async (req: Request, res: Response) => {
  try {
    let list = [];
    const quotation_transaction_list =
      await prisma.quotation_transaction.findMany({
        where: {
          quotationStatus: "pending" || "rejected"
        }
      });

    if (quotation_transaction_list) {
      for (let i = 0; i < quotation_transaction_list.length; i++) {
        const constructionCompanyId =
          quotation_transaction_list[i].constructionCompanyId;
        const opportunityId = quotation_transaction_list[i].opportunityId;
        const projectManagerId = quotation_transaction_list[i].projectManagerId;
        const salesPersonId = quotation_transaction_list[i].salesPersonId;

        const companyData = await prisma.construction_company.findUnique({
          where: {
            id: constructionCompanyId,
          },
        });

        const opportunityData = await prisma.opportunities.findUnique({
          where: {
            id: opportunityId,
          },
        });

        const projectManagerData = await prisma.project_manager.findUnique({
          where: {
            id: projectManagerId,
          },
        });

        const salesPersonData = await prisma.user.findUnique({
          where: {
            id: salesPersonId,
          },
        });

        const quoteTypeList = await prisma.quotation_type.findFirst({
          where: {
            Quote_Transaction_Id: quotation_transaction_list[i].id
          },
        });

        const data = quotation_transaction_list[i];

        list.push({
          constructionCompanyId: constructionCompanyId,
          constructionCompanyName: companyData?.construction_company_name,
          opportunityId: opportunityId,
          opportunityName: opportunityData?.lead_name,
          projectManagerId: projectManagerId,
          projectManagerName: projectManagerData?.project_manager_name,
          salesPersonId: salesPersonId,
          salesPersonName: salesPersonData?.firstName,
          plantId: data.plantId,
          id: data.id,
          dueDate: data.dueDate,
          increaseDate: data.increaseDate,
          notes: data.notes,
          quotationStatus: data.quotationStatus,
          status: data.status,
          tr3Required: data.tr3Required,
          quoteCode: quoteTypeList.quoteCode,
          quoteType: quoteTypeList.Quote_Type,
          quoteTypeList: quoteTypeList,
        });
      }

      return res
        .status(http_status.OK)
        .json({ data: list, message: "Success" });
    } else {
      return res
        .status(http_status.Not_Found)
        .json({ data: null, message: "No Data Found" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(http_status.Bad_Request)
      .json({ message: "Failed to get data" });
  }
};

export const getApprovedQuotations = async (req: Request, res: Response) => {
  try {
    let list = [];
    const quotation_transaction_list =
      await prisma.quotation_transaction.findMany({
        where: {
          quotationStatus: "approved"
        }
      });

    if (quotation_transaction_list) {
      for (let i = 0; i < quotation_transaction_list.length; i++) {
        const constructionCompanyId =
          quotation_transaction_list[i].constructionCompanyId;
        const opportunityId = quotation_transaction_list[i].opportunityId;
        const projectManagerId = quotation_transaction_list[i].projectManagerId;
        const salesPersonId = quotation_transaction_list[i].salesPersonId;

        const companyData = await prisma.construction_company.findUnique({
          where: {
            id: constructionCompanyId,
          },
        });

        const opportunityData = await prisma.opportunities.findUnique({
          where: {
            id: opportunityId,
          },
        });

        const projectManagerData = await prisma.project_manager.findUnique({
          where: {
            id: projectManagerId,
          },
        });

        const salesPersonData = await prisma.user.findUnique({
          where: {
            id: salesPersonId,
          },
        });

        const quoteTypeList = await prisma.quotation_type.findFirst({
          where: {
            Quote_Transaction_Id: quotation_transaction_list[i].id
          },
        });

        const data = quotation_transaction_list[i];

        list.push({
          constructionCompanyId: constructionCompanyId,
          constructionCompanyName: companyData?.construction_company_name,
          opportunityId: opportunityId,
          opportunityName: opportunityData?.lead_name,
          projectManagerId: projectManagerId,
          projectManagerName: projectManagerData?.project_manager_name,
          projectManagerEmail: projectManagerData?.email,
          salesPersonId: salesPersonId,
          salesPersonName: salesPersonData?.firstName,
          plantId: data.plantId,
          id: data.id,
          dueDate: data.dueDate,
          increaseDate: data.increaseDate,
          notes: data.notes,
          quotationStatus: data.quotationStatus,
          status: data.status,
          tr3Required: data.tr3Required,
          quoteCode: quoteTypeList.quoteCode,
          quoteType: quoteTypeList.Quote_Type,
          date: quoteTypeList.createdOn,
          quoteTypeList: quoteTypeList,
        });
      }

      return res
        .status(http_status.OK)
        .json({ data: list, message: "Success" });
    } else {
      return res
        .status(http_status.Not_Found)
        .json({ data: null, message: "No Data Found" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(http_status.Bad_Request)
      .json({ message: "Failed to get data" });
  }
};

export const getQuotationData = async (req: Request, res: Response) => {
  try {
    const quotation_id = req.params.id

    const quoteData = await prisma.quotation_transaction.findUnique({
      where: {
        id: quotation_id
      }
    })

    const extraChargeData = await prisma.quote_extra_charge.findMany({
      where: {
        quotationId: quotation_id
      }
    })

    const overtimeFeeData = await prisma.quote_overtime_charge.findMany({
      where: {
        quotationId: quotation_id
      }
    })

    const premiumRateData = await prisma.quote_premium_rates.findMany({
      where: {
        quotationId: quotation_id
      }
    })

    const shortLoadChargeData = await prisma.quote_shortload_charge.findMany({
      where: {
        quotationId: quotation_id
      }
    })

    const productData = await prisma.quality_control.findMany({
      where: {
        section_id: quotation_id
      }
    })

    const termsShortData = await prisma.terms_and_condition_short_detail.findMany()

    const termsDetailData = await prisma.terms_and_condition_short_detail.findMany()

    const data = {
      quoteData, extraChargeData, overtimeFeeData, premiumRateData, shortLoadChargeData, productData, termsShortData, termsDetailData
    }


    return res
      .status(http_status.OK)
      .json({ data: data, message: "Success" });


  } catch (err) {
    console.log(err)
    return res
      .status(http_status.Bad_Request)
      .json({ message: "Failed to get data" });
  }


}

export const getQuotationDataForPDF = async (id: any) => {
  try {
    console.log("id: ", id)
    const quotation_id = id

    const quoteData = await prisma.quotation_transaction.findUnique({
      where: {
        id: quotation_id
      }
    })

    const extraChargeData = await prisma.quote_extra_charge.findMany({
      where: {
        quotationId: quotation_id
      }
    })

    const overtimeFeeData = await prisma.quote_overtime_charge.findMany({
      where: {
        quotationId: quotation_id
      }
    })

    const premiumRateData = await prisma.quote_premium_rates.findMany({
      where: {
        quotationId: quotation_id
      }
    })

    const shortLoadChargeData = await prisma.quote_shortload_charge.findMany({
      where: {
        quotationId: quotation_id
      }
    })

    const productData = await prisma.quality_control.findMany({
      where: {
        section_id: quotation_id
      }
    })

    const termsShortData = await prisma.terms_and_condition_short_detail.findMany()

    const termsDetailData = await prisma.terms_and_condition_short_detail.findMany()

    const data = {
      quoteData, extraChargeData, overtimeFeeData, premiumRateData, shortLoadChargeData, productData, termsShortData, termsDetailData
    }


    return data


  } catch (err) {
    console.log(err)
  }


}


export const getQuotationHistory = async (req: Request, res: Response) => {
  try {
    let list = [];
    const quotation_transaction_list =
      await prisma.quotation_transaction.findMany();

    if (quotation_transaction_list) {
      for (let i = 0; i < quotation_transaction_list.length; i++) {
        const constructionCompanyId =
          quotation_transaction_list[i].constructionCompanyId;
        const opportunityId = quotation_transaction_list[i].opportunityId;
        const projectManagerId = quotation_transaction_list[i].projectManagerId;
        const salesPersonId = quotation_transaction_list[i].salesPersonId;

        const companyData = await prisma.construction_company.findUnique({
          where: {
            id: constructionCompanyId,
          },
        });

        const opportunityData = await prisma.opportunities.findUnique({
          where: {
            id: opportunityId,
          },
        });

        const projectManagerData = await prisma.project_manager.findUnique({
          where: {
            id: projectManagerId,
          },
        });

        const salesPersonData = await prisma.user.findUnique({
          where: {
            id: salesPersonId,
          },
        });

        const quoteTypeList = await prisma.quotation_type.findFirst({
          where: {
            Quote_Transaction_Id: quotation_transaction_list[i].id
          },
        });

        const data = quotation_transaction_list[i];

        list.push({
          constructionCompanyId: constructionCompanyId,
          constructionCompanyName: companyData?.construction_company_name,
          opportunityId: opportunityId,
          opportunityName: opportunityData?.lead_name,
          projectManagerId: projectManagerId,
          projectManagerName: projectManagerData?.project_manager_name,
          salesPersonId: salesPersonId,
          salesPersonName: salesPersonData?.firstName,
          plantId: data.plantId,
          id: data.id,
          dueDate: data.dueDate,
          increaseDate: data.increaseDate,
          notes: data.notes,
          quotationStatus: data.quotationStatus,
          status: data.status,
          tr3Required: data.tr3Required,
          quoteCode: quoteTypeList.quoteCode,
          quoteType: quoteTypeList.Quote_Type,
          date: quoteTypeList.createdOn,
          quoteTypeList: quoteTypeList,
          sendEmail: "pending"
        });
      }

      return res
        .status(http_status.OK)
        .json({ data: list, message: "Success" });
    } else {
      return res
        .status(http_status.Not_Found)
        .json({ data: null, message: "No Data Found" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(http_status.Bad_Request)
      .json({ message: "Failed to get data" });
  }
}

// export const getQuotePdf =async(req: Request, res: Response)=>{
//   try{

//     const quotation_id = req.params.id

//     const quoteData = await prisma.quotation_transaction.findUnique({
//       where: {
//         id: quotation_id
//       }
//     })

//     const extraChargeData = await prisma.quote_extra_charge.findMany({
//       where: {
//         quotationId: quotation_id
//       }
//     })

//     const overtimeFeeData = await prisma.quote_overtime_charge.findMany({
//       where: {
//         quotationId: quotation_id
//       }
//     })

//     const premiumRateData = await prisma.quote_premium_rates.findMany({
//       where: {
//         quotationId: quotation_id
//       }
//     })

//     const shortLoadChargeData = await prisma.quote_shortload_charge.findMany({
//       where: {
//         quotationId: quotation_id
//       }
//     })

//     const productData = await prisma.quality_control.findMany({
//       where: {
//         section_id: quotation_id
//       }
//     })

//     const termsShortData = await prisma.terms_and_condition_short_detail.findMany()

//     const termsDetailData = await prisma.terms_and_condition_short_detail.findMany()

//     const data = {
//       quoteData, extraChargeData, overtimeFeeData, premiumRateData, shortLoadChargeData, productData, termsShortData, termsDetailData
//     }

//     HTMLGeneration(quotetransPdf).then((result: any) => {
//       if (result.status) {
//         res.status(httpStatus.OK).json(result)
//       } else {
//         if (!result.status) {
//           res.status(httpStatus.Bad_Request).json({
//             code: httpStatus.Bad_Request,
//             error: result.error,
//           })
//         } else {
//           res.status(httpStatus.Bad_Request).json({
//             code: httpStatus.Bad_Request,
//             error: "Error While Generate Quote PDF",
//           })
//         }
//       }
//     }).catch((err) =>
//       res.status(httpStatus.Bad_Request).json({
//         code: httpStatus.Bad_Request,
//         error: err,
//       }))


//     return res
//       .status(http_status.OK)
//       .json({ data: data, message: "Success" });


//   } catch (err) {
//     console.log(err)
//     return res
//       .status(http_status.Bad_Request)
//       .json({ message: "Failed to get data" });
//   }

// }