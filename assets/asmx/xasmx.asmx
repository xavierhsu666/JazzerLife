<%@ WebService Language="C#" Class="WebService" %>
using System;
using System.Web;
using Newtonsoft.Json;
using System.Web.Services;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Script.Services;

[ScriptService]
public class WebService : System.Web.Services.WebService
{

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string meta_sql (string sql_code)
    {
        string sql = @""+sql_code;
        DataTable DT_result = ChangeDataToTable(sql);

        string str_json = JsonConvert.SerializeObject(DT_result, Formatting.Indented);
        return str_json;
    }

    [WebMethod]
    public string sel_DX_Omega_Heatmap_Loading (string Area, string WS_Group, string ww_start, string ww_end)
    {
        string sql = @"EXEC [ME_Planning].[OMT].[sel_DX_Omega_Heatmap_Loading] @Area ='" + Area + "', @WS_Group ='" + WS_Group + "', @ww_start ='" + ww_start + "', @ww_end ='" + ww_end + "'";
        DataTable DT_result = ChangeDataToTable(sql);

        string str_json = JsonConvert.SerializeObject(DT_result, Formatting.Indented);
        return str_json;
    }
    private DataTable ChangeDataToTable(string query)
    {

        //string constr = ConfigurationManager.ConnectionStrings["PROD06"].ConnectionString;
        string constr = ConfigurationManager.ConnectionStrings["KAZUO"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandTimeout = 600;
                using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                {
                    DataTable dt = new DataTable();
                    sda.Fill(dt);
                    return dt;
                }
            }
        }
    }
    private string QuerySQL(string sql)
    {
        //string constr = ConfigurationManager.ConnectionStrings["PROD06"].ConnectionString;
        string constr = ConfigurationManager.ConnectionStrings["KAZUO"].ConnectionString;

        try
        {
            SqlConnection con = new SqlConnection();
            con.ConnectionString = constr;
            con.Open();
            SqlCommand cmd = new SqlCommand(sql, con);
            //cmd.CommandTimeout = 1200;
            cmd.ExecuteNonQuery();
            con.Close();
            return "Success";
        }
        catch
        {
            return "Fail";
        }
    
    }	

    private string QuerySQL_long(string sql)
    {
        //string constr = ConfigurationManager.ConnectionStrings["PROD06"].ConnectionString;
        string constr = ConfigurationManager.ConnectionStrings["KAZUO"].ConnectionString;

        try
        {
            SqlConnection con = new SqlConnection();
            con.ConnectionString = constr;
            con.Open();
            SqlCommand cmd = new SqlCommand(sql, con);
            cmd.CommandTimeout = 0;
            cmd.ExecuteNonQuery();
            con.Close();
            return "Success";
        }
        catch
        {
            return "Fail";
        }
    
    }	

    private string QuerySQL_long_TY(string sql)
    {
        //string constr = ConfigurationManager.ConnectionStrings["TYMSSPROD06"].ConnectionString;
        string constr = ConfigurationManager.ConnectionStrings["KAZUO"].ConnectionString;

        try
        {
            SqlConnection con = new SqlConnection();
            con.ConnectionString = constr;
            con.Open();
            SqlCommand cmd = new SqlCommand(sql, con);
            cmd.CommandTimeout = 0;
            cmd.ExecuteNonQuery();
            con.Close();
            return "Success";
        }
        catch
        {
            return "Fail";
        }
    
    }	
}
