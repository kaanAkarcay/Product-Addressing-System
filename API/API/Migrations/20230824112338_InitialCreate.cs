using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "brands",
                columns: table => new
                {
                    Brand_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Brand_Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_brands", x => x.Brand_ID);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "product_Categories",
                columns: table => new
                {
                    Product_Category_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Product_Category_Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_product_Categories", x => x.Product_Category_ID);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "shelves",
                columns: table => new
                {
                    Shelf_ID = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_shelves", x => x.Shelf_ID);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "products",
                columns: table => new
                {
                    Barcode = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Product_Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Sex = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Brand_ID = table.Column<int>(type: "int", nullable: false),
                    Product_Category_ID = table.Column<int>(type: "int", nullable: false),
                    Brand_ID1 = table.Column<int>(type: "int", nullable: false),
                    Product_Category_ID1 = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_products", x => x.Barcode);
                    table.ForeignKey(
                        name: "FK_products_brands_Brand_ID1",
                        column: x => x.Brand_ID1,
                        principalTable: "brands",
                        principalColumn: "Brand_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_products_product_Categories_Product_Category_ID1",
                        column: x => x.Product_Category_ID1,
                        principalTable: "product_Categories",
                        principalColumn: "Product_Category_ID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "adresses",
                columns: table => new
                {
                    Adress_Barcode = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Product_Amount = table.Column<int>(type: "int", nullable: false),
                    Row = table.Column<int>(type: "int", nullable: false),
                    Column = table.Column<int>(type: "int", nullable: false),
                    Face = table.Column<int>(type: "int", nullable: false),
                    Product_Barcode = table.Column<long>(type: "bigint", nullable: false),
                    Shelf_ID = table.Column<int>(type: "int", nullable: false),
                    productBarcode = table.Column<long>(type: "bigint", nullable: true),
                    Shelf_ID1 = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_adresses", x => x.Adress_Barcode);
                    table.ForeignKey(
                        name: "FK_adresses_products_productBarcode",
                        column: x => x.productBarcode,
                        principalTable: "products",
                        principalColumn: "Barcode");
                    table.ForeignKey(
                        name: "FK_adresses_shelves_Shelf_ID1",
                        column: x => x.Shelf_ID1,
                        principalTable: "shelves",
                        principalColumn: "Shelf_ID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_adresses_productBarcode",
                table: "adresses",
                column: "productBarcode");

            migrationBuilder.CreateIndex(
                name: "IX_adresses_Shelf_ID1",
                table: "adresses",
                column: "Shelf_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_products_Brand_ID1",
                table: "products",
                column: "Brand_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_products_Product_Category_ID1",
                table: "products",
                column: "Product_Category_ID1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "adresses");

            migrationBuilder.DropTable(
                name: "products");

            migrationBuilder.DropTable(
                name: "shelves");

            migrationBuilder.DropTable(
                name: "brands");

            migrationBuilder.DropTable(
                name: "product_Categories");
        }
    }
}
