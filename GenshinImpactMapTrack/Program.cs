using System;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var hwd = Process.GetProcessesByName("YuanShen").First().MainWindowHandle;
init();
SetHandle(hwd);
var builder = WebApplication.CreateBuilder();
var url = "https://*:5000";
builder.Services.AddCors(options =>
{
	options.AddPolicy(name: "Local",
					  builder =>
					  {
						  builder.AllowAnyOrigin()
						  .AllowAnyHeader()
						  .AllowAnyMethod();
					  });
});

var app = builder.Build();
app.Urls.Add(url);
app.UseCors();
const float scale = 2f / 3f;
app.MapGet("/api/position", () =>
{
	float x = 0, y = 0, a = 0;
	var success = GetTransform(ref x, ref y, ref a);
	x *= scale;
	y *= scale;
	a *= -1;
	return new {success, x, y, a};
}).RequireCors("Local");

app.Run();
uninit();


[DllImport("CVAUTOTRACK.dll")]
extern static bool init();

[DllImport("CVAUTOTRACK.dll")]
extern static bool uninit();

[DllImport("CVAUTOTRACK.dll")]
extern static bool SetHandle(IntPtr handle);


[DllImport("CVAUTOTRACK.dll")]
extern static bool GetTransform(
	ref float x,
	ref float y,
	ref float a
);
